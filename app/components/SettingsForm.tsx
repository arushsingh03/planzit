"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface iAppProps {
  Name: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ email, Name, profileImage }: iAppProps) {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="grid gap-y-4">
          <div className="grid gap-y-2">
            <Label>Name</Label>
            <Input
              name={fields.Name.name}
              key={fields.Name.key}
              defaultValue={Name}
              placeholder="Update Profile Name"
            />
            <p className="text-black font-semibold">{fields.Name.errors}</p>
          </div>
          <div className="grid gap-y-2">
            <Label>Email</Label>
            <Input
              disabled
              defaultValue={email}
              placeholder="plannerz@planzit.com"
            />
          </div>

          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            {currentProfileImage ? (
              <div className="relative size-16">
                <img
                  src={currentProfileImage}
                  alt="ProfileImg"
                  className="size-16 rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  type= "button" 
                  className="absolute -top-3 -right-3"
                  onClick={handleDeleteImage}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <h1>No Image</h1>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
