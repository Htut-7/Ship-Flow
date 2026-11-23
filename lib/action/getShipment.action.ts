"use server";

import Shipment, { IShipement } from "@/database/shipment.model";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import validateBody from "../validateBody";
import getShipmentSchema from "../schema/getShipmentSchema";
import { QueryFilter } from "mongoose";

export async function getShipment(params: {
    page?: number;
    pageSize?: number;
    filter?: string;
    status: string;
}) : Promise<{
    success: boolean;
    data?: {
        shipments: IShipement[];
        isNext?: boolean;
        totalShipments: number;
    };
    message?: string;
    details?: object | null;
}>{
    await dbConnect();

    const session=await auth();

    const role=(session?.user as &{role: string}).role;

    if(!session?.user?.id || role !== "Admin"){
        throw new Error("Unauthorized");
    }

    try{
        const validatedData=validateBody(params,getShipmentSchema);
        const {page=1, pageSize=10, filter, status}=validatedData;

        const skip=(Number(page)-1)*10;
        const limit=Number(pageSize);

        const query: QueryFilter<IShipement>={};

        if(status !== "all"){
            query.status=status;
        }

        let sortingCriteria={};

        switch (filter){
            case "latest":
                sortingCriteria={createdAt: -1};
                break;

            case "oldest":
                sortingCriteria={createdAt: 1};
                break;
            
            default:
                sortingCriteria={createdAt: -1};
                break;
        }

        const totalShipments=await Shipment.countDocuments(query);
        const shipments=await Shipment.find(query)
                        .populate("customerId", "_id name email")
                        .sort(sortingCriteria)
                        .skip(skip)
                        .limit(limit)

        const isNext=totalShipments > skip + shipments.length;

        return{
            success: true,
            data: {
                shipments: JSON.parse(JSON.stringify(shipments)),
                isNext,
                totalShipments,
            }
        }

    }catch(e){
        return{
            success: false,
            message: e instanceof Error ? e.message : "Something went wrong while fetching customers shipments."
        }
    }

}