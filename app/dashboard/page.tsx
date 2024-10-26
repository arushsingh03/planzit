import Link from "next/link";
import prisma from "../lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";
import { Button } from "@/components/ui/button";
import { EmptyState } from "../components/EmptyState";
import { Pencil, Settings, Trash2, Users2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyLinkMenuItem } from "../components/CopyLinkMenu";
import PreviewLinkButton from "../components/PreviewLinkButton";
import { MenuActiveSwitch } from "../components/EventTypeSwitcher";

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
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold">
                Your Events
              </h1>
              <p className="text-muted-foreground">
                Create and Manage Your Events
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">Create New Event</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {data.eventType.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden shadow-lg rounded-lg border relative flex flex-col justify-between h-full"
              >
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="text-center">
                        Event
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <PreviewLinkButton
                            href={`/${data.userName}/${item.url}`}
                          />
                        </DropdownMenuItem>
                        <CopyLinkMenuItem
                          sessionUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${item.url}`}
                        />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}`}>
                            <Pencil className="mr-2 w-4 h-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-400 hover:text-red-300"
                        asChild
                      >
                        <Link href={`/dashboard/event/${item.id}/delete`}>
                          <Trash2 className="mr-2 w-4 h-4" /> Delete
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href="/" className="flex items-center p-6">
                  <div className="flex-shrink-0">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {item.duration} Minutes Session
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>

                <div className="bg-muted px-5 py-3 flex items-center justify-between">
                  <MenuActiveSwitch
                    initialChecked={item.active}
                    eventTypeId={item.id}
                  />
                  <Button asChild>
                    <Link href={`/dashboard/event/${item.id}`}>Edit Event</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
