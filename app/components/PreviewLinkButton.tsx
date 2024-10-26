"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PreviewLinkButton = ({
  href,
  className,
}: {
  href: string;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
  };

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start px-2 py-1.5 text-sm ${className}`}
      disabled={isLoading}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <ExternalLink className="mr-2 size-4" />
        <span>{isLoading ? "Loading preview..." : "Preview"}</span>
      </div>
    </Button>
  );
};

export default PreviewLinkButton;
