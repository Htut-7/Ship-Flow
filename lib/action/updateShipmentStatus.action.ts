"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import updateShipmentStatusSchema from "../schema/updateShipmentSchema";
import Shipment from "@/database/shipment.model";

export async function updateShipmentStatus(params: {
    shipmentId: string;
    status: string;
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

    try{
        const validatedData=validateBody(params,updateShipmentStatusSchema);
        const {shipmentId, status}=validatedData;

        const shipment=await Shipment.findOne(({
            _id: shipmentId,
            status: "pending",
        }));

        if(!shipment){
            throw new Error("Shipment not found.Shipment is no longer pending");
        }

        shipment.status=status;

        await shipment.save();

        return{
            success: true,
            message: shipment.status==="confirmed" ? "Shipment approved successfully" : "Shipment rejected",
        }

    }catch(e){
        return{
            success: false,
            message: e instanceof Error ? e.message : "Something went wrong when updating the status",
        }
    }
}