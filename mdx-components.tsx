import Link from "next/link";
import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

function MdxLink({ href = "", className, ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link
        href={href}
        className={cn(
          "text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noopener noreferrer"}
      className={cn(
        "text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary",
        className,
      )}
      {...props}
    />
  );
}

function MdxCode({ className, children, ...props }: ComponentProps<"code">) {
  // Shiki code blocks render tokenized React element children;
  // inline MDX code is plain text.
  const isInlineCode =
    typeof children === "string" || typeof children === "number";

  if (!isInlineCode) {
    return (
      <code
        className={className}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code
      className={cn(
        "diary-inline-code bg-input/30 px-1.5 py-0.5 text-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

const headingClassName = "scroll-mt-24 font-bold tracking-normal text-primary";

// TODO: Add table and image component
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: MdxLink,
    h1: ({ className, ...props }) => (
      <h1
        className={cn("text-3xl md:text-4xl", headingClassName, className)}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-12 border-b border-border pb-2 text-2xl",
          headingClassName,
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn("mt-8 text-xl", headingClassName, className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn("mt-6 text-lg", headingClassName, className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("text-foreground", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn("ml-5 list-disc space-y-2 marker:text-accent", className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "ml-5 list-decimal space-y-2 marker:text-accent",
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={cn("pl-1 text-foreground", className)}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-l-2 border-accent bg-card/60 px-4 py-3 text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }) => (
      <div className="overflow-x-auto">
        <table
          className={cn("w-full border-collapse text-left", className)}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border border-border bg-card px-3 py-2 font-semibold text-primary",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn("border border-border px-3 py-2", className)}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn("my-10 border-border", className)}
        {...props}
      />
    ),
    code: MdxCode,
    ...components,
  };
}
