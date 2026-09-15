import React from "react";
import Link from "next/link";
import { 
  Home, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  Zap,
  Trees,
  MapPin,
  ExternalLink,
  Navigation,
  Compass,
  Building2,
  Droplets
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { RESIDENTIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";
import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/plots/residential");
}

const RESIDENTIAL_AMENITIES = [
  {
    title: "100% Underground Utilities",
    desc: "Zero hanging wires, ensuring clear neighborhood views and dependable electricity supply.",
    icon: Zap,
    image: "/images/facilities/underground-utilities.webp"
  },
  {
    title: "Eco-Friendly Family Parks",
    desc: "Over 40% dedicated green open spaces, jogging trails, and shaded recreational parks.",
    icon: Trees,
    image: "/images/sectors/green-community-park.webp"
  },
  {
    title: "Grand Jamia Mosque Access",
    desc: "Iconic architectural community mosque within walking distance of all residential sectors.",
    icon: Building2,
    image: "/images/amenities/grand-mosque.webp"
  },
  {
    title: "24/7 Gated Security & Surveillance",
    desc: "Multi-point security checkpoints, RFID barrier access, and continuous boundary surveillance.",
    icon: ShieldCheck,
    image: "/images/facilities/gated-security.webp"
  },
  {
    title: "Clean Drinking Water Plant",
    desc: "Dedicated subterranean water reservoir and RO filtration supply for every household.",
    icon: Droplets,
    image: "/images/facilities/water-filtration.webp"
  },
  {
    title: "Wide Carpeted Avenues",
    desc: "Smooth, well-lit paved internal avenues with dedicated green median belts.",
    icon: Compass,
    image: "/images/amenities/amenity_boulevard.webp"
  }
];

const RESIDENTIAL_PLOT_CARDS = [
  {
    size: "5 Marla",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPrice: "PKR 45,00,000",
    downPayment: "PKR 4,50,000 (10%)",
    monthly: "PKR 45,000 / month",
    possession: "PKR 9,00,000 (20%)",
    image: "/images/sectors/sector-a-luxury.webp",
    tag: "Most Popular",
    desc: "Perfect for young families and smart investors seeking maximum ROI with high liquidity in Sector A & B."
  },
  {
    size: "10 Marla",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPrice: "PKR 82,50,000",
    downPayment: "PKR 8,25,000 (10%)",
    monthly: "PKR 82,500 / month",
    possession: "PKR 16,50,000 (20%)",
    image: "/images/sectors/sector-b-residential.webp",
    tag: "Spacious Family Living",
    desc: "Spacious luxury plots allowing for custom multi-storey villas, double car parking, and private front lawns."
  },
  {
    size: "1 Kanal",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPrice: "PKR 1,55,00,000",
    downPayment: "PKR 15,50,000 (10%)",
    monthly: "PKR 1,55,000 / month",
    possession: "PKR 31,00,000 (20%)",
    image: "/images/about/about-hero-banner.webp",
    tag: "Executive Boulevard",
    desc: "Flagship luxury estate plots facing wide avenues and close to the central Grand Mosque."
  }
];

const RESIDENTIAL_INVESTOR_REASONS = [
  {
    title: "Master Planned Infrastructure",
    desc: "Designed with modern urban guidelines, wide roadways, and underground cabling.",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Modern Urban"
  },
  {
    title: "Prime GT Road Highway Access",
    desc: "Direct entrance on Main GT Road near Rawat with 0-minute highway commute convenience.",
    image: "/images/amenities/amenity_boulevard.webp",
    tag: "Direct Access"
  },
  {
    title: "Healthy & Green Environment",
    desc: "Surrounded by manicured gardens, tree-lined streets, and pollution-free atmosphere.",
    image: "/images/sectors/green-community-park.webp",
    tag: "Eco Living"
  },
  {
    title: "High Capital Appreciation",
    desc: "Fast ongoing ground development leading to strong price growth across all sectors.",
    image: "/images/sectors/sector-a-luxury.webp",
    tag: "Capital Growth"
  }
];

const RESIDENTIAL_NEARBY_LANDMARKS = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    timeHighlight: "text-[#D49E17]",
    distance: "Direct Frontage Access",
    bgClass: "bg-amber-50/70 border-amber-300",
    image: "/images/amenities/amenity_boulevard.webp"
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    timeHighlight: "text-slate-900",
    distance: "3.5 km via Main GT Road",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_t_chowk.webp"
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    timeHighlight: "text-slate-900",
    distance: "8.0 km Expressway Link",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_giga_mall.webp"
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    timeHighlight: "text-emerald-700",
    distance: "11.0 km Direct Bypass",
    bgClass: "bg-white border-slate-200 hover:border-emerald-400",
    image: "/images/landmark_dha_islamabad.webp"
  }
];

const RESIDENTIAL_FAQS = [
  {
    question: "What plot sizes are available in Saffron City residential sectors?",
    answer: "Saffron City offers standard residential plots in 5 Marla (25' × 45'), 10 Marla (35' × 65'), and 1 Kanal (50' × 90') sizes, all with wide street frontages.",
    category: "Plots"
  },
  {
    question: "What is the installment plan for residential plots?",
    answer: "Residential plots come with a 3-year easy installment schedule featuring a 10% down payment, 10% at allocation, 30 monthly installments, 6 bi-annual installments, and 20% upon possession.",
    category: "Payment"
  },
  {
    question: "Is electricity underground across all residential sectors?",
    answer: "Yes, 100% of the electrification grid across executive residential sectors is subterranean, eliminating overhead wires and ensuring continuous power.",
    category: "Utilities"
  }
];

export default function ResidentialPlotsPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I am interested in booking a Residential Plot in Saffron City."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* 1. Hero Banner Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sectors/sector-a-luxury.webp"
            alt="Saffron City Residential Plots"
            title="Saffron City Residential Plots"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <WordReveal
            text="Residential Plots for Sale: 5M, 10M & 1 Kanal"
            highlightWords={["Residential", "Plots", "Sale", "5M", "10M", "1", "Kanal"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Designed for families and investors seeking secure ownership with 100% underground utilities, wide carpeted roads, and 3-year easy installment schedules.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150} className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#plots"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              Explore Available Plots
            </a>
            <a
              href="#residential-location"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-[#D49E17]" />
              <span>Location &amp; Map</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* 2. Residential Overview (TEXT ON LEFT, IMAGE ON RIGHT) */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text Content */}
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#D49E17] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Residential Living</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
                Residential Overview: Master Planned Community
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                Saffron City residential sectors are designed with international urban standards — prioritizing safety, tranquil open spaces, uninterrupted subterranean utilities, and wide carpeted roadways.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Zap className="w-4 h-4 text-[#D49E17]" />
                    <span>Underground Electrification</span>
                  </div>
                  <p className="text-xs text-slate-600">Zero overhead cables ensuring pristine skylines and high safety.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Trees className="w-4 h-4 text-emerald-600" />
                    <span>40% Green Open Areas</span>
                  </div>
                  <p className="text-xs text-slate-600">Every block features walking access to landscaped parks and tracks.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#plots"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs shadow transition-all"
                >
                  <span>Explore Plots</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Right: Image Card */}
            <ScrollReveal animation="fade-left" className="lg:col-span-5">
              <div className="relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200 group">
                <img
                  src="/images/sectors/sector-a-luxury.webp"
                  alt="Saffron City Residential Enclave Overview"
                  title="Saffron City Residential Enclave Overview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#D49E17] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Residential Overview
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <p className="text-xs font-semibold text-amber-300">5M, 10M &amp; 1 Kanal Plots • 3-Year Plan</p>
                  <h3 className="text-xl font-bold font-heading text-white">Tranquil Community Living</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 3. Residential Amenities */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Residential Community Amenities"
              highlightWords={["Residential", "Community", "Amenities"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Master-planned infrastructure ensuring every resident enjoys a modern, secure, and enriched lifestyle.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESIDENTIAL_AMENITIES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <ScrollReveal
                  key={item.title}
                  animation={idx % 3 === 0 ? "fade-right" : idx % 3 === 1 ? "fade-up" : "fade-left"}
                  delay={idx * 80}
                >
                  <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#D49E17] shadow">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#D49E17] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 4. Location & Nearby Landmarks Section */}
        <section id="residential-location" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Location & Commute Distances"
              highlightWords={["Location", "Commute", "Distances"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Direct highway access on Main GT Road near Rawat, connecting seamlessly to Islamabad and Rawalpindi.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Landmarks List Left */}
            <ScrollReveal animation="fade-right" className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D49E17] text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Main GT Road Highway Corridor</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Twin Cities Travel Milestones
                </h3>

                <div className="space-y-3">
                  {RESIDENTIAL_NEARBY_LANDMARKS.map((item, idx) => (
                    <div
                      key={item.name}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${item.bgClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-amber-300/80 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            title={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h4>
                          <p className="text-[11px] text-slate-500">{item.distance}</p>
                        </div>
                      </div>
                      <strong className={`text-xs sm:text-sm font-bold font-mono ${item.timeHighlight}`}>
                        {item.time}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=Saffron+City+Rawat+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Schedule Site Visit</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Embedded Google Map Right */}
            <ScrollReveal animation="fade-left" className="lg:col-span-6 space-y-3">
              <div className="w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border-2 border-amber-300 shadow-2xl relative bg-slate-100">
                <iframe
                  title="Saffron City Residential Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106450.60155606992!2d73.11181283995874!3d33.49397682977461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfebbe487dc843%3A0x6b63d76b1f237efb!2sRawat%2C%20Rawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/95 border border-amber-300 text-amber-900 text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-[#D49E17]" />
                  <span>Saffron City • Residential Enclaves</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. Residential Plots for Sale */}
        <section id="plots" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Available Residential Plot Categories"
              highlightWords={["Available", "Residential", "Plot", "Categories"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Select your desired plot size to inspect exact dimensions, price breakdown, and booking requirements.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESIDENTIAL_PLOT_CARDS.map((plot, idx) => (
              <ScrollReveal
                key={plot.size}
                animation={idx === 0 ? "fade-right" : idx === 1 ? "fade-up" : "fade-left"}
                delay={idx * 100}
              >
                <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <img
                        src={plot.image}
                        alt={plot.size}
                        title={`${plot.size} Residential Plot`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#D49E17] border border-[#D49E17]/40 text-[10px] font-bold">
                          {plot.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-2xl font-black">{plot.size} Residential</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-mono font-medium">{plot.dimensions}</p>
                        <p className="text-2xl font-black text-[#D49E17]">{plot.totalPrice}</p>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {plot.desc}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-amber-50/60">
                          <span className="text-slate-600">Booking (10%):</span>
                          <strong className="text-slate-900">{plot.downPayment}</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-2.5 font-mono">
                          <span className="text-slate-600">Monthly (×30):</span>
                          <strong className="text-slate-900">{plot.monthly}</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-2.5">
                          <span className="text-slate-600">On Possession:</span>
                          <strong className="text-emerald-700 font-bold">{plot.possession}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-2">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                        `Hi, I want to book a ${plot.size} Residential Plot in Saffron City.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
                    </a>
                    <Link
                      href="/payment-plan"
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center block transition-colors"
                    >
                      Full Payment Breakdown
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 6. Master Map / Demarcation Callout Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-amber-50/50 border border-amber-200 shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#D49E17] uppercase tracking-wider block">
                Official Demarcation &amp; Layout
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                Inspect Residential Sectors on the 4K Master Plan
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore the complete sector layout, avenue road networks, green parks, and plot demarcation boundaries on our interactive high-resolution master plan viewer.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/master-plan"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Open Master Plan Viewer</span>
              </Link>
              <Link
                href="/payment-plan"
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-amber-300 text-slate-800 font-bold text-xs text-center transition-colors"
              >
                Payment Schedule
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Features / Why Choose Saffron Residential Living */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Why Choose Saffron Residential Plots"
              highlightWords={["Choose", "Saffron", "Residential", "Plots"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Created with world-class planning for high security, peace of mind, and continuous asset appreciation.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESIDENTIAL_INVESTOR_REASONS.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <ScrollReveal 
                  key={item.title} 
                  animation={isLeft ? "fade-right" : "fade-left"}
                  delay={index * 80}
                >
                  <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#D49E17] text-slate-950 text-[10px] font-bold shadow">
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#D49E17] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 8. Pricing Schedule Table */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Official 3-Year Installment Schedule
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Transparent payment structure with fixed installments and zero hidden charges.
            </p>
          </div>
          
          <ScrollReveal animation="fade-up" delay={100}>
            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-3">
              {RESIDENTIAL_PRICES.map((p) => (
                <div
                  key={`mob-plot-res-${p.size}`}
                  className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                    <div>
                      <span className="text-base font-bold text-slate-900 font-heading block">
                        {p.size}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600">
                        {p.sector || "Sector A (Block B)"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        TOTAL PRICE
                      </span>
                      <span className="text-base font-bold text-[#D49E17] font-heading">
                        {p.totalPriceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 text-xs">
                    <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                      <span className="text-[10px] text-amber-900/80 font-medium block">Booking (10%)</span>
                      <span className="font-bold text-slate-800 text-[11px]">{p.bookingAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Allocation (10%)</span>
                      <span className="font-bold text-slate-800 text-[11px]">{p.allocationAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Monthly (×30)</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.monthlyInstallmentFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Bi-Annual (×6)</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.biAnnualInstallmentFormatted}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">Possession (20%):</span>
                    <span className="font-bold text-emerald-700">{p.possessionAmountFormatted}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Full Table View */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-amber-900 uppercase text-[11px] font-bold border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Plot Size</th>
                    <th className="py-4 px-5">Total Price</th>
                    <th className="py-4 px-5">Booking (10%)</th>
                    <th className="py-4 px-5">Allocation (10%)</th>
                    <th className="py-4 px-5">Monthly (×30)</th>
                    <th className="py-4 px-5">Bi-Annual (×6)</th>
                    <th className="py-4 px-5">Possession (20%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {RESIDENTIAL_PRICES.map((p) => (
                    <tr key={p.size} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 text-sm">{p.size}</td>
                      <td className="py-4 px-5 font-bold text-[#D49E17]">{p.totalPriceFormatted}</td>
                      <td className="py-4 px-5">{p.bookingAmountFormatted}</td>
                      <td className="py-4 px-5">{p.allocationAmountFormatted}</td>
                      <td className="py-4 px-5 font-mono">{p.monthlyInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-mono">{p.biAnnualInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-bold text-emerald-700">{p.possessionAmountFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </section>

        {/* 9. Residential FAQs */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <WordReveal
              text="Frequently Asked Questions"
              highlightWords={["Frequently", "Questions"]}
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
          </div>

          <ScrollReveal animation="fade-up" delay={100}>
            <FaqAccordion items={RESIDENTIAL_FAQS} defaultOpenIndex={0} />
          </ScrollReveal>
        </section>

        {/* 10. Booking Form */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <WordReveal
              text="Book Your Residential Plot Today"
              highlightWords={["Book", "Residential", "Plot"]}
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading block"
            />
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your inquiry to reserve your preferred plot size with priority allotment.
            </p>
          </div>

          <ScrollReveal animation="zoom-in" delay={100}>
            <EnquiryForm defaultPlotType="Residential" />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}

