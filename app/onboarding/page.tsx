import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Onboarding() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader className="text-2xl gap-2 text-center">
          <CardTitle>
            Turn chaos into clarity with Planzit,
            <br />
            <div className="text-purple-500">Plan it. Own it. PlanzIt.</div>
          </CardTitle>
          <CardDescription className="text-lg">
            Tell us a bit about yourself to, complete your profile...
          </CardDescription>
          <hr className="my-4" />{" "}
        </CardHeader>
        <CardContent className="grid gap-y-5 ">
          <div className="grid gap-y-2">
            <Label>Name</Label>
            <Input placeholder="What should we call you?" />
          </div>
          <div className="grid gap-y-2">
            <Label>Username</Label>
            <div className="flex rounded-md ">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted text-sm text-muted-foreground bg-purple-100">
                PlanzIt.com/
              </span>
              <Input placeholder="ready-user-1" className="rounded-l-none" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
