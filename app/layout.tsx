import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import CrtOverlay from "@/components/ui/crt-overlay";
import { SEO } from "@/lib/content/seo";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: "%s | Jeet Shah",
  },
  description: SEO.description,
  keywords: SEO.keywords,
  metadataBase: new URL(SEO.url),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Jeet Shah", url: SEO.url }],
  creator: "Jeet Shah",
  publisher: "Jeet Shah",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: "/",
    siteName: "Jeet Shah",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jeet Shah | Software Developer, Columbia University MS CS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2.5,
  // This ensures the layout resizes when the keyboard opens
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-accent selection:text-accent-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded focus:border focus:border-border focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <CrtOverlay />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
