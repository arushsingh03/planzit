"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { SettingsAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { parseWithZod } from "@conform-to/zod";
import { Button } from "@/components/ui/button";
import { settingsSchema } from "../lib/zodSchemas";
import { UploadDropzone } from "../lib/uploadthing";

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
              placeholder="plannerz@planzIt.com"
            />
          </div>

          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                <img
                  src={currentProfileImage}
                  alt="ProfileImg"
                  className="size-16 rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="close"
                  type="button"
                  className="absolute -top-3 -right-3"
                  onClick={handleDeleteImage}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success("Profile Image has been uploaded");
                }}
                onUploadError={(error) => {
                  console.log("something went wrong", error);
                  toast.error(error.message);
                }}
                endpoint="imageUploader"
                appearance={{
                  container: `
                    w-full h-50
                    border-2 border-dashed border-gray-300
                    rounded-lg
                    hover:border-purple-500
                    bg-white/50 hover:bg-purple-50
                    transition-all duration-200
                    flex flex-col items-center justify-center
                    cursor-pointer
                  `,
                  label: "text-base font-medium text-gray-700 hover:text-purple-500",
                  allowedContent: "text-sm text-gray-500 font-normal",
                  button: `
                    bg-purple-500 hover:bg-purple-600
                    text-white font-medium
                    rounded-md
                    px-6 py-2
                    ut-uploading:bg-gray-400
                    ut-uploading:cursor-not-allowed
                    transition-colors
                  `,
                  uploadIcon: "w-10 h-10 text-gray-400",
                }}
                content={{
                  label: "Drop files here or click to browse",
                  allowedContent: "Supported formats: JPG, PNG, PDF",
                  button: "Upload files"
                }}
              />
            )}
            <p className="text-black font-semibold">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
