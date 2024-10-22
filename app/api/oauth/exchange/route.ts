import prisma from "@/app/lib/db";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";

export async function GET(req: NextRequest) {
    const session = await requireUser();

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return Response.json("Unable to fetch authorization code.", {
            status: 400,
        });
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey,
            clientId: nylasConfig.clientId,
            redirectUri: nylasConfig.redirectUri,
            code: code
        });

        const { grantId, email } = response;

        await prisma.user.update({
            where: {
                id: session.user?.id
            },
            data: {
                grantId: grantId,
                grantEmail: email,
            }
        })
    } catch (error) {
        console.log("Error something went wrong", error);
    }

    redirect("/dashboard")
}