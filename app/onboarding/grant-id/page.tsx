import Link from "next/link";
import Image from "next/image";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SponGif from "@/public/spongebob-done.gif";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingrouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Almost finished!</CardTitle>
          <CardDescription>Let’s get your calendar linked to your account.</CardDescription>
          <Image src={SponGif} alt="Done" className="w-full rounded-lg"/>
        </CardHeader>
        <CardContent>
            <Button asChild className="w-full">
                <Link href="/api/auth">
                <CalendarPlus className="size-4 mr-2"/>
                    Connect Calendar to your account
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
