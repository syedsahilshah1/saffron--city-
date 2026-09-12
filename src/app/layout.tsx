import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { db } from "@/lib/db";
import { getPageMetadata } from "@/lib/seo";
import { OrganizationSchema } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return await getPageMetadata("/");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await db.getSettings();

  const socialLinks = [
    settings.facebookUrl,
    settings.instagramUrl,
    settings.youtubeUrl,
    settings.linkedinUrl,
    settings.twitterUrl,
  ].filter(Boolean);

  return (
    <html lang="en" className={`${playfair.variable} bg-white`}>
      <head>
        {/* Google Analytics 4 Script */}
        {settings.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {settings.googleTagManagerId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.googleTagManagerId}');
            `}
          </Script>
        )}

        {/* Custom Header Script */}
        {settings.customHeadScript && (
          <script
            dangerouslySetInnerHTML={{ __html: settings.customHeadScript }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-[#D49E17] selection:text-slate-950">
        {/* Structured Data: Organization & Real Estate Agent Schema */}
        <OrganizationSchema
          name={settings.orgName || settings.siteName}
          legalName={settings.orgLegalName}
          url={settings.canonicalUrl || "https://saffroncity.org"}
          logo={settings.orgLogo || "/images/logo.png"}
          phone={settings.contactPhone}
          email={settings.officialEmail}
          priceRange={settings.orgPriceRange}
          streetAddress={settings.orgStreetAddress || settings.officeAddress}
          addressLocality={settings.orgAddressLocality}
          addressRegion={settings.orgAddressRegion}
          postalCode={settings.orgPostalCode}
          addressCountry={settings.orgAddressCountry}
          geoLat={settings.orgGeoLat}
          geoLng={settings.orgGeoLng}
          openingDays={settings.orgOpeningDays ? settings.orgOpeningDays.split(",").map((d) => d.trim()).filter(Boolean) : undefined}
          openingHoursOpens={settings.orgOpeningHoursOpens}
          openingHoursCloses={settings.orgOpeningHoursCloses}
          socialLinks={socialLinks}
        />

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
