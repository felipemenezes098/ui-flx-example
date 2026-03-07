"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const defaultProps = {
  attribute: "class" as const,
  defaultTheme: "system" as const,
  enableSystem: true,
  disableTransitionOnChange: true,
  enableColorScheme: false,
};

export function ThemeProvider({
  children,
  ...props
}: Readonly<React.ComponentProps<typeof NextThemesProvider>>) {
  return (
    <NextThemesProvider {...defaultProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
