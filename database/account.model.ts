import { Schema, Types, Document, model, models } from "mongoose";

export interface IAccount{
    userId: Types.ObjectId;
    provider: string;
    providerAccountId: string;
}

export interface IAccountDoc extends IAccount , Document{}

const accountSchema= new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User", 
        },
        provider: {
            type: String,
            required: true,
        },
        providerAccountId: {
            type: String,
            required: true,
        }
    },{timestamps: true}
);

accountSchema.index(
    {provider: 1, providerAccountId: 1},
    {unique: true},
)

const Account= models.Account || model<IAccount>("Account", accountSchema);
export default Account;