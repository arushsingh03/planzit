"use client";

import { toast } from "sonner";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

const DarkModeNotification = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "light") {
      const timeout = setTimeout(() => {
        toast("Try Dark Mode!", {
          description:
            "Switch to dark mode for cooler animations and better viewing experience",
          action: {
            label: "Enable",
            onClick: () => setTheme("dark"),
          },
          icon: <Moon className="text-purple-500" />,
          duration: 5000,
          className: "bg-white dark:bg-white",
        });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [theme]);

  return null;
};

export default DarkModeNotification;
