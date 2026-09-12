import React from "react";

interface OrganizationSchemaProps {
  name?: string;
  legalName?: string;
  url?: string;
  logo?: string;
  phone?: string;
  email?: string;
  priceRange?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  geoLat?: string;
  geoLng?: string;
  openingDays?: string[];
  openingHoursOpens?: string;
  openingHoursCloses?: string;
  socialLinks?: string[];
}

export function OrganizationSchema({
  name,
  legalName,
  url = "https://saffroncity.org",
  logo = "/images/saffron-city-logo.webp",
  phone,
  email,
  priceRange,
  streetAddress,
  addressLocality,
  addressRegion,
  postalCode,
  addressCountry = "PK",
  geoLat,
  geoLng,
  openingDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  openingHoursOpens = "09:00",
  openingHoursCloses = "19:00",
  socialLinks = [],
}: OrganizationSchemaProps) {
  if (!name && !legalName) return null;

  const fullLogo = logo?.startsWith("http")
    ? logo
    : `${url.replace(/\/$/, "")}${logo?.startsWith("/") ? "" : "/"}${logo || "images/logo.png"}`;

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: name || legalName,
  };

  if (legalName) schema.legalName = legalName;
  if (url) schema.url = url;
  if (fullLogo) {
    schema.logo = fullLogo;
    schema.image = fullLogo;
  }
  if (phone) schema.telephone = phone;
  if (email) schema.email = email;
  if (priceRange) schema.priceRange = priceRange;

  if (streetAddress || addressLocality || addressRegion || postalCode) {
    schema.address = {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      ...(addressLocality ? { addressLocality } : {}),
      ...(addressRegion ? { addressRegion } : {}),
      ...(postalCode ? { postalCode } : {}),
      ...(addressCountry ? { addressCountry } : {}),
    };
  }

  if (geoLat && geoLng) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: geoLat,
      longitude: geoLng,
    };
  }

  if (openingDays && openingDays.length > 0) {
    schema.openingHoursSpecification = [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: openingDays,
        opens: openingHoursOpens,
        closes: openingHoursCloses,
      },
    ];
  }

  const validSocialLinks = (socialLinks || []).filter(Boolean);
  if (validSocialLinks.length > 0) {
    schema.sameAs = validSocialLinks;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName?: string;
  publisherLogo?: string;
}

export function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  publisherName = "Saffron City Islamabad",
  publisherLogo = "https://saffroncity.org/images/saffron-city-logo.webp",
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline,
    description,
    image: [image],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `https://saffroncity.org${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CustomJsonLd({ jsonString }: { jsonString?: string }) {
  if (!jsonString || !jsonString.trim()) return null;

  try {
    // Validate JSON format
    const parsed = JSON.parse(jsonString);
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(parsed) }}
      />
    );
  } catch {
    return null;
  }
}
