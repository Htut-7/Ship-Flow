import { model, models, Schema, Types, Document } from "mongoose";
import { shipmentStatus } from "./shipment.model";

export interface IHistory{
    shipmentId: Types.ObjectId;
    status: shipmentStatus;
    description: string;
    updatedBy: Types.ObjectId;
    location: string;
}

export interface IHistoryDoc extends IHistory , Document{}

const historySchema=new Schema(
    {   
        shipmentId: {
            type: Schema.Types.ObjectId,
            ref: "Shipment",
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
        description: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        location: {
            type: String,
            required: true,
        }
    },{timestamps: true}
);

const History=models.History || model<IHistory>("History",historySchema);
export default History;