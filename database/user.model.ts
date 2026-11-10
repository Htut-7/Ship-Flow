import { Schema, Document, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  image?: string;
  role: string;
  isActive: boolean;
  emailVerified?: Date;
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "Customer",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    emailVerified: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true },
);

const User = models?.User || model<IUser>("User", userSchema);
export default User;
