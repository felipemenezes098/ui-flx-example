import Link from "next/link";

import { ThemeSwitcher } from "@/components/core/theme-switcher";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Logo } from "../core/logo";

const navLinks = [{ href: "/", label: "Home" }];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="container mx-auto flex max-w-6xl items-center px-6 py-2 gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hover:bg-muted h-7 rounded-lg px-2"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-80"
            >
              <Logo.Flexnative className="text-primary size-3.5 w-auto mt-0.5" />
              {siteConfig.name}
            </Link>
          </Button>
          <ul className="flex items-center gap-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={
                  "hover:bg-muted dark:hover:bg-muted/50 rounded-lg px-2 py-1 text-sm font-medium"
                }
              >
                {label}
              </Link>
            ))}
          </ul>
        </div>
        <div className="ml-auto shrink-0">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
