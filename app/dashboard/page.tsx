import { requireuser } from "../lib/hooks";

export default async function DashboardPage() {
  const session = await requireuser();

  return (
    <div>
      Dash Board
    </div>
  )
}



