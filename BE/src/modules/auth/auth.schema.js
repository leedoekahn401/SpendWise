import z from "zod";

export const authRegisterSchema = z.object({
    username: z.string().min(3,"Username must be at least 3 characters long").max(20,"Username must be at most 20 characters long"),
    email: z.email("Invalid email format"),
    password: z.string().min(8,"Password must be at least 8 characters long"),
}).strict();

export const authLoginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(8,"Password must be at least 8 characters long"),
}).strict();

export const authUpdateProfileSchema = z.object({
    username: z.string().min(3,"Username must be at least 3 characters long").max(20,"Username must be at most 20 characters long").optional(),
    email: z.email("Invalid email format").optional(),
    profilePic: z.string().optional(),
}).strict();