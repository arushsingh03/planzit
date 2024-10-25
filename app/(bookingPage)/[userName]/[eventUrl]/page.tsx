import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateMeetingAction } from "@/app/actions";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { CalendarRange, Clock, VideoIcon } from "lucide-react";
import { TimeTable } from "@/app/components/bookingForm/TimeTable";
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
  searchParams: { date?: string; time?: string };
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

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4">
      {/* Added padding to prevent card from touching screen edges */}
      {showForm ? (
        <Card className="max-w-[600px] w-full">
          {/* Fixed grid template columns syntax and added proper gap */}
          <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-6">
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

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <form
              className="flex flex-col gap-y-4"
              action={CreateMeetingAction}
            >
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input type="hidden" name="meetingLength" value={data.duration} />
              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />
              <input type="hidden" name="userName" value={params.userName} />
              <input type="hidden" name="eventTypeId" value={data.id} />
              <div className="flex flex-col gap-y-2">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Name" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Your Email</Label>
                <Input name="email" placeholder="planzIt@ex.com" />
              </div>
              <SubmitButton className="w-full mt-5" text="Book Session" />
            </form>
          </CardContent>
        </Card>
      ) : (
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

            <TimeTable
              duration={data.duration}
              selectedDate={selectedDate}
              userName={params.userName}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
