import z from "zod";

const signInSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().trim(),
});

export default signInSchema;
