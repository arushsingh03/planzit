"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema } from "./lib/zodSchemas";

export async function OnboardingAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema, 
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.Name,
        },
    });
}