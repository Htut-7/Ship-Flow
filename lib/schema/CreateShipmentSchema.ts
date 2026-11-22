import z from "zod";

const CreateShipmentSchema=z.object({
    sender: z.object ({
        name: z.string().trim().min(1,"Sender name is required"),
        phone: z.string().min(1,"Sender phone is required"),
        address: z.object({
            addressLine1: z.string().trim().min(1,"Address Line 1 is required"),
            addressLine2: z.string().optional(),
            township: z.string().trim().min(1,"Township is required"),
            district: z.string().trim().min(1,"District is required"),
            region: z.string().trim().min(1,"Region is required"),
        }),
    }),
    receiver:z.object({
        name: z.string().trim().min(1,"Receiver name is required"),
        phone: z.string().min(1,"Receiver phone is required"),
        address: z.object({
            addressLine1: z.string().trim().min(1,"Address Line 1 is required"),
            addressLine2: z.string().optional(),
            township: z.string().trim().min(1,"Township is required"),
            district: z.string().trim().min(1,"District is required"),
            region: z.string().trim().min(1,"Region is required"),
        }),
    }),
    description: z.string().trim().optional(),
    weight: z.number().positive("Weight must be greater than 0"),
});

export default CreateShipmentSchema;