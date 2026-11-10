import { Schema, Types, Document, model, models } from "mongoose";
import Shipment from "./shipment.model";

export interface IDelivery{
    shipmentId: Types.ObjectId;
    photoUrl: string;
    notes?: string;
    receivedBy: string;
    deliveredAt: Date;
}

export interface IDeliveryDoc extends IDelivery , Document{}

const deliverySchema= new Schema(
    {
        shipmentId: {
            type: Schema.Types.ObjectId,
            ref: "Shipment",
            required: true,
        },
        photoUrl: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: false,
        },
        receivedBy: {
            type: String,
            required: true,
        },
        deliveredAt: {
            type: Date,
            required: true,
        }
    },{timestamps: true}
);

deliverySchema.index({shipmentId: 1}, {unique: true})

const DeliveryProof=models.DeliveryProof || model<IDelivery>("DeliveryProof",deliverySchema);
export default DeliveryProof;

