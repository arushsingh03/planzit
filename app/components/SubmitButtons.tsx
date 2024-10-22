"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import GoogleImg from "@/public/google.png";
import GitHubImg from "@/public/github.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn("w-fit", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="outline"
          className="w-full font-semibold text-lg"
        >
          <Loader2 className="size-4 mr-2 animate-spin" /> Please Wait...
        </Button>
      ) : (
        <Button variant="outline" className="w-full font-normal text-base">
          <Image src={GoogleImg} alt="Google Icon" className="size-4 mr-2" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="outline"
          className="w-full font-semibold text-lg"
        >
          <Loader2 className="size-4 mr-2 animate-spin" /> Please Wait...
        </Button>
      ) : (
        <Button variant="outline" className="w-full font-normal text-base">
          <Image src={GitHubImg} alt="GitHub Icon" className="size-4 mr-2" />
          Sign in with GitHub
        </Button>
      )}
    </>
  );
}
