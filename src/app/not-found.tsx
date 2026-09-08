import Link from "next/link";
import { Building2, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 lg:pt-28 pb-16">
      <div className="w-16 h-16 rounded-2xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400 mb-6">
        <Building2 className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-white font-heading mb-2">
        404 — Page Not Found
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The page you are looking for does not exist or has been moved. Explore Saffron City plots and payment plans.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-600 text-navy-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Return to Saffron City Home</span>
      </Link>
    </div>
  );
}
