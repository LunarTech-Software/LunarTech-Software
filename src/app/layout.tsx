import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InitLoader from "@/components/InitLoader";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "LUNAR — The Orbit of Intelligent Operations",
  description:
    "LUNAR builds custom websites, business systems, automation, and IoT monitoring, engineered around how your operation actually works.",
  openGraph: {
    title: "LUNAR — The Orbit of Intelligent Operations",
    description:
      "LUNAR builds custom websites, business systems, automation, and IoT monitoring, engineered around how your operation actually works.",
    siteName: "LUNAR",
    type: "website",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-foreground">
        <LanguageProvider>
          <InitLoader />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
