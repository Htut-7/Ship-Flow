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
      async authorize(credential){
        const validateField= validateBody(credential, signInSchema);

        if(validateField){
          const {email,password}=validateField;

          await dbConnect();

          const existingAccount=await Account.findOne({
            provider: "credentials",
            providerAccountId: email,
          });

          if(!existingAccount){
            throw new Error("Account not found");
          }

          const existingUser=await User.findById(
            existingAccount.userId
          );

          if(!existingUser || !existingAccount.isActive){
            throw new Error("User not found");
          }

          if(!existingAccount.password) return null;

          const isValidPassword=await bcrypt.compare(password,existingAccount.password);

          if(isValidPassword){
            return {
              id: existingUser._id.toString(),
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
})