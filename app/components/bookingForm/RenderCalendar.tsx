"use client";

import { Calendar } from "./Calendar";
import { DateValue } from "@react-types/calendar";
import {
  today,
  getLocalTimeZone,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
  availability: {
    day: string;
    isActive: boolean;
  }[];
}

export function RenderCalendar({ availability }: iAppProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = useState(() => {
    const dateParam = searchParams.get("date");

    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }, [searchParams]);

  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);

    const url = new URL(window.location.href);

    url.searchParams.set("date", date.toString());

    router.push(url.toString());
  };

  const isDateUnavailable = (date: DateValue) => {
    // Get day of week (0-6, where 0 is Sunday)
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

    // Ensure the index exists in the availability array
    if (dayOfWeek < 0 || dayOfWeek >= availability.length) {
      return true; // Consider invalid indices as unavailable
    }

    // If using Monday as first day (1-7), use this adjustment
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Safety check for adjusted index
    if (adjustedIndex < 0 || adjustedIndex >= availability.length) {
      return true;
    }

    return !availability[adjustedIndex].isActive;
  };

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    />
  );
}
