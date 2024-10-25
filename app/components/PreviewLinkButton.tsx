"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const PreviewLinkButton = ({ href, className }: { href: string; className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Button
      variant="ghost"
      className={className}
      disabled={isLoading}
      onClick={handleClick}
      asChild
    >
      <Link href={href}>
        <ExternalLink className="mr-2 size-4" />
        {isLoading ? "Loading preview..." : "Preview"}
      </Link>
    </Button>
  );
};

export default PreviewLinkButton;