import z from "zod";

const getCustomerDetailsSchema=z.object({
    customerId: z.string(),
    page: z.number().positive(),
    pageSize: z.number().positive(),
});

export default getCustomerDetailsSchema;