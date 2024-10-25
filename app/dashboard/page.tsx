import Link from "next/link";
import prisma from "../lib/db";
import { Pencil, Settings, Trash2, Users2 } from "lucide-react";
import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { EmptyState } from "../components/EmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PreviewLinkButton from "../components/PreviewLinkButton";
import { CopyLinkMenuItem } from "../components/CopyLinkMenu";

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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.eventType.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden shadow rounded-lg border relative"
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="size-4" />
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
                            <Pencil className="mr-2 size-2" /> Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 size-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href="/" className="flex items-center p-5">
                  <div className="flex shrink-0">
                    <Users2 className="size-6" />
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
                  <Switch />

                  <Button>Edit Event</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
