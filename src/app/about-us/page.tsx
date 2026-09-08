import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Award,
  Clock,
  Users,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Calendar,
  Globe2,
  TrendingUp,
  Home
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import WordReveal from "@/components/animations/WordReveal";
import {
  SITE_CONFIG,
  LEADERSHIP,
  TIMELINE_MILESTONES
} from "@/data/saffron-data";

export const metadata = {
  title: "About Us | Saffron City Islamabad",
  description: "Learn about Saffron City Islamabad, developed by SKB Builders with 70+ years of construction legacy. RDA approved residential and commercial community on GT Road.",
};

const DIFFERENTIATORS_WITH_IMAGES = [
  {
    number: "01",
    title: "RDA Approved — Verified Legal Standing",
    desc: "The NOC is officially approved and independently verifiable on the RDA portal, ensuring complete regulatory compliance.",
    image: "/images/about/val-integrity.jpg",
    badge: "100% Legal"
  },
  {
    number: "02",
    title: "Developer with 70+ Years Track Record",
    desc: "SKB Builders has delivered mega civil and commercial infrastructure projects across Pakistan and the Middle East since 1954.",
    image: "/images/about/val-quality.jpg",
    badge: "Since 1954"
  },
  {
    number: "03",
    title: "Prime GT Road, Rawat Location",
    desc: "Located on Main GT Road near Rawat, providing effortless access to Rawalpindi, Islamabad Expressway, and upcoming Ring Road.",
    image: "/images/landmark_t_chowk.jpg",
    badge: "Main GT Road"
  },
  {
    number: "04",
    title: "Master Plan Built for Community Life",
    desc: "Integrated residential and commercial zones with educational hubs, healthcare, and 250-foot grand boulevards.",
    image: "/images/amenities/amenity_boulevard.jpg",
    badge: "250ft Boulevard"
  },
  {
    number: "05",
    title: "Infrastructure That Precedes Residents",
    desc: "Underground utilities, boundary walls, and paved roads are constructed early so physical progress supports your plot investment.",
    image: "/images/amenities/amenity_security.jpg",
    badge: "Gated Security"
  },
  {
    number: "06",
    title: "Grand Mosque & Lush Green Belts",
    desc: "Spacious family parks, lakes, and an architectural landmark Grand Mosque at the core of the community.",
    image: "/images/amenities/amenity_mosque.jpg",
    badge: "Green Belts"
  }
];

const CORE_VALUES_WITH_IMAGES = [
  {
    title: "Transparency & Integrity",
    desc: "Every buyer receives clear development timelines, verifiable legal documentation, and honest milestone progress.",
    image: "/images/about/val-integrity.jpg",
    tag: "Integrity"
  },
  {
    title: "Engineering Excellence",
    desc: "From 250-foot wide boulevards to underground utilities, every structure is built with top-tier civil engineering precision.",
    image: "/images/about/val-quality.jpg",
    tag: "Excellence"
  },
  {
    title: "Family & Community Well-Being",
    desc: "Neighborhoods designed with extensive parks, dedicated schools, and family recreation for lifelong comfort.",
    image: "/images/amenities/amenity_park.jpg",
    tag: "Community"
  },
  {
    title: "Eco-Friendly & Green Living",
    desc: "Generous green buffers, modern water filtration, and eco-friendly drainage systems embedded into the master plan.",
    image: "/images/amenities/amenity_water.jpg",
    tag: "Sustainability"
  },
  {
    title: "Gated Security & Peace of Mind",
    desc: "Round-the-clock gated security, CCTV surveillance, and dedicated perimeter security for peaceful living.",
    image: "/images/amenities/amenity_security.jpg",
    tag: "Security"
  },
  {
    title: "Long-Term Capital Appreciation",
    desc: "Strategic GT Road positioning designed to yield superior return on investment and solid generational asset growth.",
    image: "/images/about/about-hero-banner.jpg",
    tag: "Long-Term Value"
  }
];

const COMMITMENTS = [
  {
    title: "For Families",
    subtitle: "A Secure Home for Generations",
    desc: "Infrastructure delivered on time, secure gated neighborhoods, top schools, and lush parks where your family can thrive with pride.",
    image: "/images/amenities/amenity_park.jpg",
    icon: Home,
    accent: "text-amber-600",
    border: "border-amber-200"
  },
  {
    title: "For Investors",
    subtitle: "High Yield & Capital Growth",
    desc: "100% legal RDA standing, prime GT Road commercial exposure, and strong appreciation potential backed by SKB's 70-year delivery legacy.",
    image: "/images/about/val-integrity.jpg",
    icon: TrendingUp,
    accent: "text-emerald-600",
    border: "border-emerald-200"
  },
  {
    title: "For Overseas Pakistanis",
    subtitle: "Seamless Remote Ownership",
    desc: "Digital remote booking, verified Power of Attorney support, transparent video updates, and dedicated overseas sales desks.",
    image: "/images/about/about-hero-banner.jpg",
    icon: Globe2,
    accent: "text-blue-600",
    border: "border-blue-200"
  }
];

export default function AboutUsPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to learn more about Saffron City's development team and RDA approval."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/about-hero-banner.jpg"
            alt="Saffron City Islamabad Master View"
            className="w-full h-full object-cover object-center opacity-100 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>Legacy of SKB Builders Since 1954</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white">
            About <span className="text-[#D4A017]">Us</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
            Building Pakistan’s premier 15,000 Kanal RDA approved master planned community on Main GT Road, Rawat — delivering trust, architectural excellence, and generational living.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono">
                <AnimatedCounter end={70} suffix="+" />
              </span>
              <p className="text-xs text-slate-300 font-medium">Years Legacy</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono">
                <AnimatedCounter end={15000} suffix=" Kanal" />
              </span>
              <p className="text-xs text-slate-300 font-medium">Total Land Expanse</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
              <p className="text-xs text-slate-300 font-medium">RDA Approved</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono">250 Ft</span>
              <p className="text-xs text-slate-300 font-medium">Main Boulevard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* Introduction & Developer Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                <Building2 className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Saadullah Khan &amp; Brothers (SKB)</span>
              </div>
            </ScrollReveal>
            
            <WordReveal
              text="A Legacy Built on Quality & Trust"
              highlightWords={["Quality", "Trust", "&"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight block"
            />

            <ScrollReveal animation="fade-up" delay={150}>
              <p className="text-base text-slate-600 leading-relaxed">
                Islamabad has long set the benchmark for planned urban living in Pakistan. Saffron City is built to carry that standard forward — not as another speculative housing scheme, but as a structured, long-term residential and commercial community designed for families and forward-looking investors.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Located on Main GT Road, Rawat, Saffron City sits at one of the most accessible addresses in the Islamabad-Rawalpindi corridor. RDA approved, actively developing, and backed by a developer with over seven decades of mega civil engineering experience across Pakistan, Dubai, and Saudi Arabia.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal animation="zoom-in" duration={900}>
              <div className="relative rounded-3xl overflow-hidden border border-amber-200 shadow-xl group">
                <img
                  src="/images/imgi_25_saffron-city-islamabad.jpg"
                  alt="Saffron City Overview"
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="px-3 py-1 rounded-full bg-[#D4A017] text-slate-950 text-xs font-bold shadow">
                    Saffron City Project
                  </span>
                  <span className="text-xs font-medium">Main GT Road, Rawat</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                <Users className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Executive Leadership</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Our Leadership"
              highlightWords={["Leadership"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Decades of real estate, construction, and community development experience guiding every milestone.
              </p>
            </ScrollReveal>
          </div>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={120}
            direction="up"
          >
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="p-6 rounded-3xl bg-white border border-amber-200 hover:border-[#D4A017] shadow-md hover:shadow-xl transition-all space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-200 group-hover:border-[#D4A017] transition-colors shadow-sm flex-shrink-0 bg-slate-100 flex items-center justify-center">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#D4A017] transition-colors">
                        {leader.name}
                      </h4>
                      <span className="text-xs text-[#D4A017] font-bold">{leader.role}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* Development Timeline (Redesigned Style) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Project Milestones</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Development Timeline & Journey"
              highlightWords={["Timeline", "Journey", "&"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Key milestones demonstrating continuous progress from foundation to modern master development.
              </p>
            </ScrollReveal>
          </div>

          {/* Sleek Grid Roadmap Cards */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={80}
            direction="up"
          >
            {TIMELINE_MILESTONES.map((item, index) => (
              <div
                key={item.year}
                className="relative p-6 rounded-3xl bg-white border border-amber-200 hover:border-[#D4A017] shadow-md hover:shadow-xl transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4A017] text-white font-mono font-bold text-sm shadow">
                    {item.year}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                    Phase 0{index + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium pt-2">
                  {item.milestone}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* What Makes Saffron City Different (With Images) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Distinct Features</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="What Makes Saffron City Different"
              highlightWords={["Different", "Saffron", "City"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Engineered for transparency, prime connectivity, and superior living standards.
              </p>
            </ScrollReveal>
          </div>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={80}
            direction="up"
          >
            {DIFFERENTIATORS_WITH_IMAGES.map((diff) => (
              <div
                key={diff.number}
                className="rounded-3xl bg-white border border-amber-200 hover:border-[#D4A017] shadow-md hover:shadow-xl transition-all overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={diff.image}
                      alt={diff.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                      <span>{diff.number}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#D4A017] text-slate-950 text-[11px] font-bold shadow">
                        {diff.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-2">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#D4A017] transition-colors">
                      {diff.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* Our Core Values (With Images) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Principles</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Our Core Values"
              highlightWords={["Core", "Values"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                The ethical and architectural pillars that guide every decision at Saffron City.
              </p>
            </ScrollReveal>
          </div>

          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={70}
            direction="up"
          >
            {CORE_VALUES_WITH_IMAGES.map((val) => (
              <div
                key={val.title}
                className="rounded-3xl bg-white border border-amber-200 hover:border-[#D4A017] shadow-md hover:shadow-xl transition-all overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={val.image}
                      alt={val.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold shadow">
                        {val.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 group-hover:text-[#D4A017] transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{val.title}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* Our Commitment to You (With Images & Icons) */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <WordReveal
              text="Our Commitment to You"
              highlightWords={["Commitment"]}
              as="h2"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-heading block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-xs sm:text-sm text-slate-600">
                Tailored promises to ensure complete satisfaction, transparency, and trust for all stakeholders.
              </p>
            </ScrollReveal>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-amber-50/60 border border-amber-200 shadow-xl space-y-8">
            <StaggerReveal
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              staggerDelay={100}
              direction="up"
            >
              {COMMITMENTS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`rounded-3xl bg-white border ${item.border} shadow-md hover:shadow-xl transition-all overflow-hidden group flex flex-col justify-between`}
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <div className="p-1.5 rounded-xl bg-white/95 text-slate-900 shadow">
                            <IconComponent className={`w-4 h-4 ${item.accent}`} />
                          </div>
                          <span className="text-white font-bold text-sm">
                            {item.title}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <span className={`text-xs font-bold block ${item.accent}`}>
                          {item.subtitle}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </StaggerReveal>

            <ScrollReveal animation="fade-up" delay={200} className="pt-2 text-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Connect with Saffron City Official Representative</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
