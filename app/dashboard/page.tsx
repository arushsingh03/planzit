import prisma from "../lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="Looks like you haven’t created any events."
          description="Click the button below to create your first event."
          buttonText="Add New Event"
          href="/dashboard/new"
        />
      ) : (
        <p>Hey, We Have Events...</p>
      )}
    </>
  );
}
