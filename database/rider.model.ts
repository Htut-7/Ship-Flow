import { Schema, Types, Document, model, models } from "mongoose";

export interface IRider{
    userId: Types.ObjectId;
    vehicleType: string;
    vehicleNumber: string;
    availability: string;
    isActive: boolean;
}

export interface IRiderDoc extends IRider, Document{}

const riderSchema= new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        vehicleType: {
            type: String,
            required: true,
        },
        vehicleNumber: {
            type: String,
            enum: [
                "car",
                "motorcycle",
                "van",
            ],
            required: true,
        },
        availability: {
            type: String,
            enum: ["available","unavailable"],
            required: true,
            default: "Unavailable",
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        }

    },{timestamps: true}
);

riderSchema.index({userId: 1}, {unique: true});

const Rider=models.Rider || model<IRider>("Rider",riderSchema);
export default Rider;