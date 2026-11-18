import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import validateBody from "./lib/validateBody";
import signInSchema from "./lib/schema/signInSchema";
import dbConnect from "./lib/dbConnect";
import Account from "./database/account.model";
import User from "./database/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credential) {
        const validateField = validateBody(credential, signInSchema);

        if (validateField) {
          const { email, password } = validateField;

          await dbConnect();

          const existingAccount = await Account.findOne({
            provider: "credentials",
            providerAccountId: email,
          });

          if (!existingAccount) {
            return null;
          }

          const existingUser = await User.findById(existingAccount.userId);

          if (!existingUser || existingUser.isActive !== true) {
            throw new Error("User not found");
          }

          if (!existingAccount.password) {
            throw new Error("Invalid password");
          }

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password,
          );

          if (isValidPassword) {
            return {
              id: existingUser._id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
              role: existingUser.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") {
        return true;
      }
      if (account?.provider === "google") {
        if (!user.email || profile?.email_verified !== true) {
          return false;
        }

        await dbConnect();

        const email = user.email.toLowerCase();

        let existingUser = await User.findOne({ email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name || email.split("@")[0],
            email,
            image: user.image || "",
            role: "Customer",
            isActive: true,
            emailVerified: new Date(),
          });
        }

        let existingAccount = await Account.findOne({
          provider: "google",
          providerAccountId: account.providerAccountId,
        });

        if (!existingAccount) {
          existingAccount = await Account.create({
            userId: existingUser._id,
            name: user.name || "",
            image: user.image || "",
            provider: "google",
            providerAccountId: account.providerAccountId,
          });
        }

        if (existingAccount.userId.toString() !== existingUser._id.toString()) {
          return false;
        }

        user.id = existingUser._id.toString();
        (user as typeof user & { role: string }).role = existingUser.role;

        return true;
      }
      return false;
    },

    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
        (token as typeof token & { role: string }).role = (
          user as typeof user & { role: string }
        ).role;
      }
      return token;
    },

    async session({ session, token }) {
      (session.user as typeof session.user & { id: string; role: string }).id =
        token.sub as string;

      (
        session.user as typeof session.user & { id: string; role: string }
      ).role = token.role as string;
      return session;
    },
  },
});
