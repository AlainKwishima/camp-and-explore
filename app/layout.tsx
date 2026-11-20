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
  metadataBase: new URL("https://www.viator.com"),
  title: "Paris Tours, Excursions & Palace Day Trips | Viator",
  description:
    "Find and book the best Paris tours, skip-the-line museum tickets, Versailles palace excursions, and River Seine cruises. Free cancellation on most activities.",
  keywords: [
    "Paris tours",
    "Versailles palace tour",
    "Louvre tickets",
    "Seine cruise",
    "Eiffel Tower tickets",
    "Viator Paris",
  ],
  authors: [{ name: "Viator / TripAdvisor" }],
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
