import { z } from "zod";
import { conformZodMessage } from "@conform-to/zod";

export const onboardingSchema = z.object({
    Name: z.string().min(3).max(150),
    userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {
        message: "Usernames can only include letters, numbers, and hyphens."
    }),
});

export function onboardingSchemaValidation(options?: {
    isUsernameUnique: () => Promise<boolean>;
}) {
    return z.object({
        userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {
            message: "Usernames can only include letters, numbers, and hyphens."
        })
            .pipe(
                z.string().superRefine((_, ctx) => {
                    if (typeof options?.isUsernameUnique !== "function") {
                        ctx.addIssue({
                            code: "custom",
                            message: conformZodMessage.VALIDATION_UNDEFINED,
                            fatal: true,
                        });
                        return;
                    }

                    return options.isUsernameUnique().then((isUnique) => {
                        if (!isUnique) {
                            ctx.addIssue({
                                code: "custom",
                                message: "Username already registered, try another.",
                            });
                        }
                    })
                })
            ),
        Name: z.string().min(3).max(150),
    })
}

export const settingsSchema = z.object({
    Name: z.string().min(3).max(150),

    profileImage: z.string(),
})

export const eventTypeSchema = z.object({
    title: z.string().min(3).max(150),
    duration: z.number().min(15).max(60),
    url: z.string().min(3).max(150),
    description: z.string().min(3).max(500),
    videoCallSoftware: z.string().min(3), 
});