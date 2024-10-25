import Image from "next/image";
import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-medium text-lg">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="sm:mx-w-[360px]">
        <DialogHeader className="flex-row justify-center items-center gap-2 ">
          <Image src={Logo} alt="Logo" className="size-10" />
          <h4 className="text-3xl font-semibold">
            Planz<span className="text-primary">It</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
            className="w-full"
          >
            <GoogleAuthButton />
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
            className="w-full"
          >
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
