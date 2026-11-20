"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import updateProfileSchema from "../schema/updateProfileSchema";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";

export async function updateProfile(params: {
  name: string;
  email: string;
  image: File | null;
  currPassword: string;
  newPassword: string;
}): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  console.log("UPDATE PROFILE ACTION STARTED");
    console.log("Received image:", params.image);

  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const validatedData = validateBody(params, updateProfileSchema);

    const { name, email, image, currPassword, newPassword } = validatedData;

    const user = await User.findById(userId);

    const normalizeEmail = email.trim().toLowerCase();

    if (!user) {
      throw new Error("User not found");
    }

    const existingName = await User.findOne({
      name,
      _id: { $ne: userId },
    });

    if (existingName) {
      throw new Error("Username already existis");
    }

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    if (image && image.size > 0) {
      console.log("3. Image validation started");
      if (!image.type.startsWith("image/")) {
        throw new Error("Please upload valid image");
      }
      
      console.log("4. Image validation passed");

      const cloudinaryData = new FormData();

      cloudinaryData.append("file", image);
      cloudinaryData.append(
        "upload_preset",
        process.env.CLOUDINARY_UPLOAD_PRESET!,
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadedImage = await response.json();

      user.image = uploadedImage.secure_url;
    }

    const oldEmail = user.email;

    user.name = name;
    user.email = normalizeEmail;

    if (oldEmail !== normalizeEmail) {
      const credentialAccount = await Account.findOne({
        userId: user._id,
        provider: "credentials",
      });

      if (credentialAccount) {
        credentialAccount.providerAccountId = normalizeEmail;
        await credentialAccount.save();
      }
    }

    if (currPassword || newPassword) {
      const credentialAccount = await Account.findOne({
        userId: user._id,
        provider: "credentials",
      });

      if (!credentialAccount || !credentialAccount.password) {
        throw new Error(
          "This account uses Google login. Set up password feature is not available yet",
        );
      }

      if (!currPassword || !newPassword) {
        throw new Error("Current Password and New Password is required");
      }

      const isValidPassword = await bcrypt.compare(
        currPassword,
        credentialAccount.password,
      );

      if (!isValidPassword) {
        throw new Error("Current password is incorrect");
      }

      const newHashPassword = await bcrypt.hash(newPassword, 10);

      credentialAccount.password = newHashPassword;
      await credentialAccount.save();
    }

    await user.save();

    return {
      success: true,
      message: "Profile update successfully",
    };
  } catch (e) {
    return {
      success: false,
      message:
        e instanceof Error
          ? e.message
          : "Something went wrong while updating your profile",
    };
  }
}
