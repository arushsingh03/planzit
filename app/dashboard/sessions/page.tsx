import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { requireUser } from "@/app/lib/hooks";
import { format, fromUnixTime, isValid } from "date-fns";
import { EmptyState } from "@/app/components/EmptyState";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CancelMeetingAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found!");
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

// Helper function to check if timestamp is valid
const isValidTimestamp = (timestamp: number | string): boolean => {
  try {
    const numericTimestamp =
      typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;
    const date = fromUnixTime(
      numericTimestamp > 9999999999
        ? Math.floor(numericTimestamp / 1000)
        : numericTimestamp
    );
    return isValid(date);
  } catch {
    return false;
  }
};

// Helper function to get meeting URL safely
const getMeetingUrl = (item: any): string | null => {
  return (
    item?.conferencing?.details?.url ||
    item?.conferencing?.details?.meeting_url ||
    null
  );
};

// Helper function to get participant name safely
const getParticipantName = (participants: any[]): string => {
  if (
    !participants ||
    !Array.isArray(participants) ||
    participants.length === 0
  ) {
    return "No participant info";
  }
  return (
    participants[0]?.name || participants[0]?.email || "Anonymous participant"
  );
};

export default async function SessionRoutes() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  // Filter out sessions with invalid dates
  const validSessions = data.data.filter(
    (item) =>
      isValidTimestamp(item.when.startTime) &&
      isValidTimestamp(item.when.endTime)
  );

  return (
    <>
      {validSessions.length < 1 ? (
        <EmptyState
          title="No sessions found."
          description="You haven't created any sessions yet."
          buttonText="Create New Event"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Check the upcoming events you've booked with us and view the event
              links.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {validSessions.map((item, index) => {
              const startTime = fromUnixTime(
                typeof item.when.startTime === "string"
                  ? parseInt(item.when.startTime, 10)
                  : item.when.startTime > 9999999999
                  ? Math.floor(item.when.startTime / 1000)
                  : item.when.startTime
              );
              const endTime = fromUnixTime(
                typeof item.when.endTime === "string"
                  ? parseInt(item.when.endTime, 10)
                  : item.when.endTime > 9999999999
                  ? Math.floor(item.when.endTime / 1000)
                  : item.when.endTime
              );

              const meetingUrl = getMeetingUrl(item);
              const participantName = getParticipantName(item.participants);

              return (
                <form action={CancelMeetingAction}>
                  <input type="hidden" name="eventId" value={item.id} />
                  <div
                    key={index}
                    className="grid grid-cols-3 justify-between items-center border-b border-border last:border-0 pb-4 last:pb-0"
                  >
                    <div className="col-span-2">
                      <div className="flex flex-col items-start">
                        <h2 className="text-sm font-medium">
                          {item.title || "Untitled Event"}
                        </h2>
                        {participantName && (
                          <p className="text-sm text-muted-foreground">
                            Session with {participantName}
                          </p>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mt-2">
                        {format(startTime, "EEE, dd MMM")}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {format(startTime, "hh:mm a")} -{" "}
                        {format(endTime, "hh:mm a")}
                      </p>

                      {meetingUrl && (
                        <div className="flex items-center mt-2">
                          <Video className="size-4 mr-2 text-primary" />
                          <a
                            className="text-xs text-primary underline underline-offset-4"
                            href={meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join Session
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <SubmitButton
                        text="Cancel Session"
                        variant="destructive"
                        className="w-fit  flex ml-auto"
                      />
                    </div>
                  </div>
                </form>
              );
            })}
          </CardContent>
        </Card>
      )}
    </>
  );
}
