import z from "zod";

const registerSchema=z.object({
    name: z.string().trim().min(3, "Username must be at least 3 characters"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(6, "Password lenght must between 6 to 8 characters"),
});

export default registerSchema;