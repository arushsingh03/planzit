import { redirect } from "next/navigation";
import { auth } from "../lib/auth"

export default async function DashboardPage() {
  const session  = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div>
      Dash Board
    </div>
  )
}



