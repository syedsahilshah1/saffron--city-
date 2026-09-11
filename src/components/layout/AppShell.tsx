"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrDashboard =
    pathname.startsWith("/dashboard") || pathname.startsWith("/ubaid");

  if (isAdminOrDashboard) {
    return (
      <main className="min-h-screen w-full bg-slate-100 flex flex-col">
        {children}
      </main>
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-grow bg-white">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
