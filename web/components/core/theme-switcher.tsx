"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { setTheme, theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const handleTheme = (theme: string) => {
    setTheme(theme);
  };

  if (!mounted) {
    return null;
  }

  const isLight = currentTheme === "light";
  const nextTheme = isLight ? "dark" : "light";

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 transition-none"
      onClick={() => handleTheme(nextTheme)}
    >
      {isLight ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
