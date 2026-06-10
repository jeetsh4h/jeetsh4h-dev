import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-none border border-transparent bg-clip-padding text-xs font-medium focus-visible:ring-1 aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default:
          "rounded cursor-pointer bg-primary text-primary-foreground border-transparent hover:bg-primary-foreground hover:text-primary hover:border-primary",
        outline:
          "relative z-10 rounded bg-card text-accent border-border hover:z-20 hover:border-accent focus-visible:z-20 cursor-pointer",
        secondary:
          "rounded cursor-pointer bg-secondary-foreground text-secondary border-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
        tertiary:
          "rounded border-border bg-card text-accent shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer",
        destructive:
          "rounded cursor-pointer bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/80 focus-visible:border-destructive focus-visible:ring-destructive/30",
        link: "group cursor-pointer gap-2 px-0 font-mono text-muted-foreground hover:text-secondary hover:no-underline hover:decoration-secondary",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-none px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs": "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-none",
        "icon-lg": "size-9",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        className: "gap-2 px-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
