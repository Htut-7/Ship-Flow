import z from "zod";

const updateProfileSchema=z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please input valid email"),
    image: z.file().nullable(),
    currPassword: z.string(),
    newPassword: z.string(),
});

export default updateProfileSchema;