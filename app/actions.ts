"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema, onboardingSchemaValidation, settingsSchema } from "./lib/zodSchemas";


export async function OnboardingAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        userName: formData.get("userName") as string,
                    },
                });

                return !existingUsername;
            },
        }),
        async: true
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.Name,
            availability: {
                createMany: {
                    data: [
                        {
                            day: "Monday",
                            fromTme: "08:00",
                            tillTime: "18:00"
                        },
                        {
                            day: "Tuesday",
                            fromTme: "08:00",
                            tillTime: "18:00"
                        },
                        {
                            day: "Wednesday",
                            fromTme: "08:00",
                            tillTime: "18:00"
                        },
                        {
                            day: "Thursday",
                            fromTme: "08:00",
                            tillTime: "18:00"
                        },
                        {
                            day: "Friday",
                            fromTme: "08:00",
                            tillTime: "18:00"
                        },
                        {
                            day: "Saturday",
                            fromTme: "08:00",
                            tillTime: "18:00"
                        },
                        {
                            day: "Sunday",
                            fromTme: "08:00",
                            tillTime: "18:00"
                        },
                    ]
                }
            }
        },
    });

    return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: settingsSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const user = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            name: submission.value.Name,
            image: submission.value.profileImage,
        },
    });

    return redirect("/dashboard")
}

export async function updateAvailabilityAction(formData: FormData) {
    const session = await requireUser()

    const rawData = Object.fromEntries(formData.entries())

    const availabilityData = Object.keys(rawData).filter((key) => key.startsWith("id-")
    ).map((key) => {
        const id = key.replace("id-", "");

        return {
            id,
            isActive: rawData[`isActive-${id}`] === "on",
            fromTime: rawData[`fromTime-${id}`] as string,
            tillTime: rawData[`tillTime-${id}`] as string,
        };
    });
}