import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function requireuser() {
    const session = await auth()

    if (!session?.user) {
        return redirect("/");
    }
    return session;
} 