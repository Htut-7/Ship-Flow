import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import getCustomersSchema from "../schema/getCustomersSchema";
import User, { IUser } from "@/database/user.model";

export async function getCustomer(params: {
    page: number;
    pageSize: number;
    search: string;
}) : Promise<{
    success: boolean;
    data?: {
        customers: IUser[];
        isNext?: boolean;
    };
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
        const validatedData=validateBody(params, getCustomersSchema);
        const {page=1, pageSize=10, search}=validatedData;

        const skip=(Number(page)-1) * Number(pageSize);
        const limit=Number(pageSize);

        const query={
            role: "Customer",
            $or: [
                {name: {$regex: search, $options: "i"}},
                {email: {$regex: search, $options: "i"}},
            ]
        };

        const totalCustomers=await User.countDocuments(query);

        const customer=await User.find({
            role: "Customer",
        }).select("-password")
        .skip(skip)
        .limit(limit);

        const isNext=totalCustomers > skip + customer.length;

        return{
            success: true,
            data:{
                customers: JSON.parse(JSON.stringify(customer)),
                isNext
            }
        }
    }catch(e){
        return{
            success: false,
            message: e instanceof Error ? e.message : "Something went wrong while fetching customers' information",
        }
    }
}