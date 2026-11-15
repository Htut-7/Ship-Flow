import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import validateBody from "./lib/validateBody"
import signInSchema from "./lib/schema/signInSchema"
import dbConnect from "./lib/dbConnect"
import Account from "./database/account.model"
import User from "./database/user.model"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
            throw new Error("Account not found");
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
            existingAccount.password
          );

          if (isValidPassword) {
            return {
              id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
              role: existingUser.role,
            }
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") {
        return true;
      }
      return false;
    },

    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
        (token as typeof token & { role: string }).role = (user as typeof user & { role: string }).role;
      }
      return token;
    },

    async session({ session, token }) {
      (session.user as typeof session.user & { id: string }).id = token.sub as string;
      return session;
    }


  }
})