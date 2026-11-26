import z from "zod";

const updateShipmentStatusSchema=z.object({
    shipmentId: z.string(),
    status: z.enum(["confirmed","cancelled"]),
});

export default updateShipmentStatusSchema;