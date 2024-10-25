"use client";

import { toast } from "sonner";
import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function CopyLinkMenuItem({ sessionUrl }: { sessionUrl: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sessionUrl);
      toast.success("URL has been copied");
    } catch (err) {
      console.log("error");
      toast.error("Could not copy the url");
    }
  };
  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="mr-2 size-4" />
      Copy
    </DropdownMenuItem>
  );
}
