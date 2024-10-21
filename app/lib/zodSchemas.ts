import { z } from "zod";

export const onboardingSchema = z.object({
    Name: z.string().min(3).max(150),
    userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {
        message: "Usernames may only include letters, numbers, and hyphens."
    }), 
});