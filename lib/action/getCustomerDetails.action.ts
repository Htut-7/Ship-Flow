"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import getCustomerDetailsSchema from "../schema/getCustomerDetailsSchema";
import Shipment, { IShipement } from "@/database/shipment.model";
import User, { IUser } from "@/database/user.model";

export async function getCustomerDetails(params: {
  customerId: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  success: boolean;
  data?: {
    customer: IUser[];
    shipment: IShipement[];
    isNext?: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const session = await auth();

  const role = (session?.user as { role: string }).role;

  if (!session?.user?.email || role !== "Admin") {
    throw new Error("Unauthorized");
  }

  try {
    const validatedData = validateBody(params, getCustomerDetailsSchema);
    const { customerId,page=1,pageSize=10 } = validatedData;

    const skip=(Number(page)-1)*Number(pageSize);
    const limit=Number(pageSize);

    const customer = await User.findOne({
      _id: customerId,
      role: "Customer",
    }).select("-password");

    if (!customer) {
      throw new Error("Customer not found");
    }

    const totalShipments = await Shipment.countDocuments({customerId: customerId});
    const shipment = await Shipment.find({
      customerId: customerId,
    })
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit);

    const isNext=totalShipments > skip + shipment.length;

    return {
      success: true,
      data: {
        shipment: JSON.parse(JSON.stringify(shipment)),
        customer,
        isNext,
      },
    };
  } catch (e) {
    return {
      success: false,
      message:
        e instanceof Error
          ? e.message
          : "Something went wrong while fetching customer details",
    };
  }
}
