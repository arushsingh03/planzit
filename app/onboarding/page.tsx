"use client";

import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingAction } from "../actions";
import { parseWithZod } from "@conform-to/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { onboardingSchema } from "../lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";

export default function Onboarding() {
  const [lastResult, action] = useFormState(OnboardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader className="text-2xl gap-2 text-center">
          <CardTitle>
            Turn chaos into clarity with PlanzIt,
            <br />
            <div className="text-purple-500">Plan it. Own it. PlanzIt.</div>
          </CardTitle>
          <CardDescription className="text-lg">
            Tell us a bit about yourself!
          </CardDescription>
          <hr className="my-4" />{" "}
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5 ">
            <div className="grid gap-y-2">
              <Label>Name</Label>
              <Input
                placeholder="What should we call you?"
                name={fields.Name.name}
                defaultValue={fields.Name.initialValue}
                key={fields.Name.key}
              />
              <p className="text-black font-bold text-sm">{fields.Name.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md ">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted text-sm text-muted-foreground bg-purple-100">
                  PlanzIt.com/
                </span>
                <Input
                  placeholder="ready-user-1"
                  className="rounded-l-none"
                  name={fields.userName.name}
                  key={fields.userName.key}
                  defaultValue={fields.userName.initialValue}
                />
              </div>
              <p className="text-black font-bold text-sm">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Create Profile" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

