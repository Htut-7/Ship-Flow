"use server";

import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import validateBody from "../validateBody";
import registerSchema from "../schema/registerSchema";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";


export async function register(params: {
    name: string;
    email: string;
    password: string
}){
    await dbConnect();
    console.log("Connected database:", mongoose.connection.name);
    const session= await mongoose.startSession();
    session.startTransaction();
    
    try{
        const validatedData=validateBody(params, registerSchema);
        const {name, email, password}=validatedData;

        const existingEmail=await User.findOne({
            email
        }).session(session);
        const users = await User.find({});
const accounts = await Account.find({});

console.log("Users:", users.length);
console.log("Accounts:", accounts.length);

        if(existingEmail){
            throw new Error("Email already exists");
        }

        const existingUser=await User.findOne({ name }).session(session);

        if(existingUser){
            throw new Error("Username already exists");
        }

        const [newUser]=await User.create([
            {
                name,
                email,
                role: "Customer",
            }
        ],{session});
        console.log("User created:", newUser._id);

        await Account.create([
            {
                userId: newUser._id,
                name,
                email,
                password: await bcrypt.hash(password,10),
                provider: "credentials",
                providerAccountId: email,
            }
        ],{session});
        console.log("Account created successfully");

        await session.commitTransaction();
        console.log("Transaction committed successfully");

        return {success: true,
            message: "Account create successfully",
        }

    }catch(e){
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
    
        return {
            success: false,
            message: e instanceof Error ? e.message : "Something went wrong",
        };

    }finally{
        await session.endSession();
    }
}