"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import CreateShipmentSchema from "../schema/CreateShipmentSchema";
import Shipment from "@/database/shipment.model";

export async function CreateShipment(params: {
  sender: {
    name: string;
    phone: string;
    address: {
      addressLine1: string;
      addressLine2?: string;
      township: string;
      district: string;
      region: string;
    };
  };
  receiver: {
    name: string;
    phone: string;
    address: {
      addressLine1: string;
      addressLine2?: string;
      township: string;
      district: string;
      region: string;
    };
  };
  description?: string;
  weight: number;
}) {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const validatedData = validateBody(params, CreateShipmentSchema);
    const { sender, receiver, description, weight } = validatedData;

    const trackingNumber = `SHP-${Date.now()}`;

    const deliveryFee = weight * 1000;

    const shipment = await Shipment.create({
      trackingNumber,
      customerId: userId,
      sender,
      receiver,
      parcelDescription: description,
      weight,
      deliveryFee,
      status: "pending",
    });

    return {
      success: true,
      message: "Shipment created Successfully",
      details: { trackingNumber: shipment.trackingNumber },
    };
  } catch (e) {
    return {
      success: false,
      message:
        e instanceof Error
          ? e.message
          : "Something went wrong while creating your shipment",
    };
  }
}
