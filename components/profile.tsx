import { ABOUT } from "@/lib/data";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { IconTerminal2, IconFileCv } from "@tabler/icons-react";
import About from "./about";
import Socials from "./socials";

export default function Profile() {
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {ABOUT.name}
          </h1>
          <p className="text-xl font-semibold text-secondary">{ABOUT.role}</p>
        </div>

        <div className="flex items-center">
          <Link href="/terminal">
            <Button className="hidden md:flex h-9 rounded cursor-pointer mr-2 hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all">
              <IconTerminal2 className="size-4" />
              <span>Open in Terminal</span>
            </Button>
          </Link>

          <Link href="/cv.pdf">
            <Button className="hidden md:flex h-9 rounded cursor-pointer mr-2 hover:bg-secondary hover:text-secondary-foreground bg-secondary-foreground text-secondary border-secondary transition-all">
              <IconFileCv className="size-4" />
              <span>Open as PDF</span>
            </Button>
          </Link>

          <ThemeToggle />
        </div>
      </div>

      <div className="relative">
        <About />
      </div>

      <div className="flex gap-6 text-sm">
        <Socials />
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden flex gap-1">
        <Link href="/terminal">
          <Button className="flex h-9 rounded cursor-pointer mr-2 hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all">
            <IconTerminal2 className="size-4" />
            <span>Open in Terminal</span>
          </Button>
        </Link>

        <Link href="/cv.pdf">
          <Button className="flex h-9 rounded cursor-pointer mr-2 hover:bg-secondary hover:text-secondary-foreground bg-secondary-foreground text-secondary border-secondary transition-all">
            <IconFileCv className="size-4" />
            <span>Open as PDF</span>
          </Button>
        </Link>
      </div>
    </>
  );
}
