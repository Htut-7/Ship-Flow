import { Schema, Types, model, models, Document } from "mongoose";

export type shipmentStatus =
  | "pending"
  | "confirmed"
  | "assigned"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "cancelled"
  | "failed";

export interface IShipement {
  trackingNumber: string;
  customerId: Types.ObjectId;
  riderId?: Types.ObjectId | null;
  startDestination: string;
  endDestination: string;
  vehicleType?: string | null;
  vehicleNumber?: string | null;
  parcelDescription?: string;
  weight: number;
  deliveryFee: number;
  status: shipmentStatus;
}

export interface IShipementDoc extends IShipement, Document {}

const shipmentSchema = new Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    riderId: {
      type: Schema.Types.ObjectId,
      ref: "Rider",
      required: false,
    },
    startDestination: {
      type: String,
      required: true,
    },
    endDestination: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: false,
    },
    vehicleNumber: {
      type: String,
      required: false,
    },
    parcelDescription: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "assigned",
        "picked_up",
        "in_transit",
        "delivered",
        "cancelled",
        "failed",
      ],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true },
);

shipmentSchema.index({ customerId: 1 });
shipmentSchema.index({ riderId: 1 });
shipmentSchema.index({ status: 1 });

const Shipment =
  models.Shipment || model<IShipement>("Shipment", shipmentSchema);
export default Shipment;
