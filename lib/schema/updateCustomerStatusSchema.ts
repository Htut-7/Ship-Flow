import z from "zod";

const updateCustomerStatusSchema=z.object({
    customerId: z.string(),
    isActive: z.boolean(),
});

export default updateCustomerStatusSchema;