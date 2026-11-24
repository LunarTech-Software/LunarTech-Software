import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import InitLoader from "@/components/InitLoader";
import { PageTransitionProvider } from "@/components/nav/PageTransition";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bylunartech.com"),
  alternates: { canonical: "./" },
  title: "LUNAR — The Orbit of Intelligent Operations",
  description:
    "LUNAR builds custom websites, business systems, automation, and IoT monitoring, engineered around how your operation actually works.",
  openGraph: {
    title: "LUNAR — The Orbit of Intelligent Operations",
    description:
      "LUNAR builds custom websites, business systems, automation, and IoT monitoring, engineered around how your operation actually works.",
    siteName: "LUNAR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "LUNAR, the orbit of intelligent operations" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  verification: {
    google: "IhCLguqRxUdTPO7NwCR4BjOv9CwgFuChxCs3RwT_x_k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#F0EAE0] focus:px-5 focus:py-3 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.06em] focus:text-[#090A0E]">
          Skip to content
        </a>
        <LanguageProvider>
          <PageTransitionProvider>
            <InitLoader />
            {children}
          </PageTransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
