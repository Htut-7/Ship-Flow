"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import updateCustomerStatusSchema from "../schema/updateCustomerStatusSchema";
import User from "@/database/user.model";

export async function updateCustomerStatus(params:{
    customerId: string;
    isActive: boolean;
}) : Promise<{
    success: boolean;
    message?: string;
    details?: object | null;
}>{
    await dbConnect();

    const session=await auth();

    if(!session?.user?.email){
        throw new Error("Unauthorized");
    }

    const role=(session.user as & {role: string}).role;

    if(role !== "Admin"){
        throw new Error("Unauthorized");
    }

    try{
        const validatedData=validateBody(params,updateCustomerStatusSchema);
        const {customerId, isActive}=validatedData;

        const customer=await User.findOne({
            _id: customerId,
            role: "Customer",
        });

        if(!customer){
            throw new Error("Customer not found");
        }

        customer.isActive=isActive;
        await customer.save();

        return{
            success: true,
            message: "Customer status update successfully",
        }

    }catch(e){
        return {
            success: false,
            message: e instanceof Error ? e.message : "Something went wrong while updating status",
        }
    }
}