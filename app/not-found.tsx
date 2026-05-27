import Footer from "@/components/footer";
import NotFoundPath from "@/components/not-found-path";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconTerminal2, IconFileCv } from "@tabler/icons-react";

export default async function NotFound() {
  return (
    <div className="min-h-screen flex flex-col font-mono">
      <div className="mx-auto flex w-full flex-none items-center justify-between p-4 pb-2 z-10">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="link"
          className="group flex cursor-pointer items-center gap-2 px-0 text-xs font-mono text-muted-foreground transition-colors hover:text-secondary hover:no-underline hover:decoration-secondary"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../home</span>
        </Button>
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
          <Button
            nativeButton={false}
            render={<Link href="/terminal" />}
            variant={null}
            className="flex h-9 rounded cursor-pointer font-mono bg-primary text-primary-foreground border-transparent hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all"
          >
            <IconTerminal2 className="size-4" />
            <span>./terminal</span>
          </Button>

          <Button
            nativeButton={false}
            render={<Link href="/pdf" />}
            variant={null}
            className="flex h-9 rounded cursor-pointer font-mono bg-secondary-foreground text-secondary border-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
          >
            <IconFileCv className="size-4" />
            <span>./cv.pdf</span>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
