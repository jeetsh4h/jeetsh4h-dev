import { ABOUT } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconTerminal2 } from "@tabler/icons-react";
import About from "@/components/about";
import Socials from "./socials";

export default function Profile() {
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-term-user tracking-tight">
            {ABOUT.name}
          </h1>
          <p className="text-xl text-term-host">{ABOUT.role}</p>
        </div>

        <div className="flex items-center">
          <ThemeToggle />

          {/* Desktop CTA */}
          <Link href="/terminal">
            <Button className="hidden md:flex rounded-full h-9 bg-term-user text-term-bg hover:bg-term-user/90 hover:opacity-100 border-0 cursor-pointer ml-3">
              <IconTerminal2 className="w-4 h-4 text-term-muted group-hover:text-term-user transition-colors" />
              <span>Open in Terminal</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative">
        <About />
      </div>

      <div className="flex gap-6 text-sm">
        <Socials />
      </div>

      {/* Mobile CTA */}
      <Link href="/terminal">
        <Button className="md:hidden inline-flex items-center gap-2 text-xs border-term-border px-4 py-2 rounded-md transition-colors w-full justify-center h-9 bg-term-user text-term-bg hover:bg-term-user/90 hover:opacity-100 border-0 cursor-pointer">
          <IconTerminal2 className="w-4 h-4" />
          Open in Terminal
        </Button>
      </Link>
    </>
  );
}
