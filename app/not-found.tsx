import Footer from "@/components/footer";
import NotFoundPath from "@/components/not-found-path";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconTerminal2, IconFileCv } from "@tabler/icons-react";

export default async function NotFound() {
  return (
    <div className="min-h-screen flex flex-col font-mono">
      <div className="flex-none p-4 pb-2 z-10">
        <Link href="/">
          <Button
            variant="link"
            className="group flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-secondary hover:decoration-secondary transition-colors hover:no-underline cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="underline">../home</span>
          </Button>
        </Link>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-6 -mt-16">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tighter text-primary">
            404
          </h1>
          <h2 className="text-lg text-muted-foreground font-medium">
            <span className="text-destructive">ERR!</span> command not found:{" "}
            <NotFoundPath />
          </h2>
        </div>

        <p className="text-sm text-muted-foreground max-w-sm">
          The path you are looking for does not exist or has been moved.
        </p>

        <div className="flex items-center gap-4 pt-4">
          <Link href="/terminal">
            <Button className="flex h-9 rounded cursor-pointer font-mono hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all">
              <IconTerminal2 className="size-4" />
              <span>./terminal</span>
            </Button>
          </Link>

          <Link href="/pdf">
            <Button className="flex h-9 rounded cursor-pointer font-mono hover:bg-secondary hover:text-secondary-foreground bg-secondary-foreground text-secondary border-secondary transition-all">
              <IconFileCv className="size-4" />
              <span>./cv.pdf</span>
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
