import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "@/app/lib/hooks";
import { SettingsForm } from "@/app/components/SettingsForm";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function () {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <SettingsForm
      Name={data.name as string}
      email={data.email}
      profileImage={data.image as string}
    />
  );
}
