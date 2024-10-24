import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarRange, Clock, VideoIcon } from "lucide-react";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: { userName: string; eventUrl: string };
  searchParams: { date?: string };
}) {
  const data = await getData(params.eventUrl, params.userName);
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(selectedDate)
    .replace(/(\w{3})/, "$1,");

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4">
      {/* Added padding to prevent card from touching screen edges */}
      <Card className="max-w-[1000px] w-full mx-auto">
        {/* Fixed grid template columns syntax and added proper gap */}
        <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-6">
          {/* Left section with user info and event details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={data.User?.image as string}
                alt="User Profile Image"
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {data.User?.name}
                </p>
                <h1 className="text-xl font-semibold">{data.title}</h1>
              </div>
            </div>

            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>

            <div className="space-y-3">
              <p className="flex items-center">
                <CalendarRange className="mr-2 size-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formattedDate}
                </span>
              </p>

              <p className="flex items-center">
                <Clock className="mr-2 size-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>

              <p className="flex items-center">
                <VideoIcon className="mr-2 size-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>

          {/* Center separator */}
          <Separator orientation="vertical" className="h-full w-[1px]" />

          {/* Right section - empty for now but maintains grid layout */}
          <RenderCalendar availability={data.User?.availability as any} />

          <Separator orientation="vertical" className="h-full w-[1px]" />

        </CardContent>
      </Card>
    </div>
  );
}
