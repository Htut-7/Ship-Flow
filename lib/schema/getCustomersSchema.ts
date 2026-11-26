import z from "zod";

const getCustomersSchema=z.object({
    page: z.number().positive(),
    pageSize: z.number().positive(),
    search: z.string(),
});

export default getCustomersSchema;