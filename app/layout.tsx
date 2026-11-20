import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const aeonik = localFont({
  src: [
    {
      path: "../public/fonts/AeonikV-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikV-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikV-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikV-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.campandexplorer.com"),
  title: "Camp & Explorer | Mount Jali Outdoor Adventures & Cultural Experiences in Kigali, Rwanda",
  description:
    "Discover authentic Rwandan cultural experiences, agro-tourism workshops, and guided Mount Jali outdoor adventures in Kigali, Rwanda. Book flexible tours with free cancellation.",
  keywords: [
    "Camp & Explorer",
    "Mount Jali hiking",
    "Kigali tours",
    "Rwanda cultural experiences",
    "Kigali outdoor adventures",
    "agro-tourism Rwanda",
    "traditional Rwandan cuisine",
    "banana beer brewing",
  ],
  authors: [{ name: "Camp & Explorer" }],
  openGraph: {
    title: "Camp & Explorer | Culture & Nature in Kigali, Rwanda",
    description:
      "Guided mountain hikes, traditional cuisine, agro-tourism, and outdoor camping at Mount Jali, Kigali, Rwanda.",
    url: "https://www.campandexplorer.com",
    siteName: "Camp & Explorer",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={aeonik.variable}>
      <body className="antialiased font-sans text-neutral-900 bg-white selection:bg-brand-light selection:text-brand-dark">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
