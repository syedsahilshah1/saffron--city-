import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saffron City Islamabad | RDA Approved Plots on GT Road Rawat",
  description:
    "Invest in Saffron City Islamabad — a premier 15,000 Kanal RDA NOC-approved housing society on Main GT Road near Rawat. 5, 10 Marla & 1 Kanal plots on easy 3-year installments.",
  keywords: [
    "Saffron City",
    "Saffron City Islamabad",
    "Saffron City Rawat",
    "RDA approved plots",
    "GT Road Rawat housing society",
    "SKB Builders",
    "5 Marla plot in Saffron City",
    "10 Marla plot",
    "1 Kanal plot",
    "Commercial plots GT Road",
    "Rawalpindi Ring Road",
  ],
  authors: [{ name: "Saffron City Development (SKB Group)" }],
  openGraph: {
    title: "Saffron City Islamabad | RDA Approved Plots on GT Road Rawat",
    description:
      "15,000 Kanal RDA NOC Approved housing society on Main GT Road, Rawat. Flexible 3-year installment plans with 10% down payment.",
    images: ["/images/hero-bg.jpg"],
    url: "https://saffroncity.pk",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} bg-white`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-[#D4A017] selection:text-slate-950">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
