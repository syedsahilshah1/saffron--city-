import { PlotPriceInfo, LandmarkDistance, AccessRoute, ReviewItem, FaqItem } from "@/types";

export const SITE_CONFIG = {
  name: "Saffron City",
  tagline: "Invest in Premium Living at Saffron City",
  subtitle: "A new residential community on GT Road, designed for families and investors who want secure ownership with easy installments.",
  eyebrow: "GT Road, Rawat — RDA NOC Approved",
  phone: "03331113551",
  phoneFormatted: "+92 333 1113551",
  whatsapp: "923331113551",
  whatsappDefaultMsg: "Hi, I am interested in booking a plot in Saffron City Islamabad.",
  email: "info@saffroncity.org",
  address: "Main GT Road (N-5 Highway), Dhoke Malik Ishaq Awan, Rawat, Islamabad/Rawalpindi",
  rdaNocStatus: "Approved by RDA — January 2025 (15,000 Kanal)",
  rdaVerificationUrl: "https://ptc.punjab.gov.pk/noc",
  developer: "Saadullah Khan and Brothers (SKB)",
  establishedYear: "1954",
  experienceYears: "70+",
  totalArea: "15,000 Kanal",
  downPaymentPercent: "10%",
  masterPlanPdf: "/images/saffron-city-master-plan.webp",
  masterPlanImage: "/images/saffron-city-master-plan.webp",
  masterPlanFullImage: "/images/saffron-city-master-plan-full.jpg",
  residentialPaymentPlanImg: "/images/c32e5714-63e2-4d87-8dd3-6a181eeb190d.jpg",
  commercialPaymentPlanImg: "/images/ff015abe-6b37-400c-8c44-e0b6d6420f2e.jpg",
};

export const RESIDENTIAL_PRICES: PlotPriceInfo[] = [
  {
    size: "5 Marla",
    category: "residential",
    totalPrice: 4500000,
    totalPriceFormatted: "PKR 45,00,000",
    bookingPercent: 10,
    bookingAmount: 450000,
    bookingAmountFormatted: "PKR 4,50,000",
    allocationPercent: 10,
    allocationAmount: 450000,
    allocationAmountFormatted: "PKR 4,50,000",
    monthlyInstallment: 45000,
    monthlyInstallmentFormatted: "PKR 45,000",
    monthlyCount: 30,
    biAnnualInstallment: 225000,
    biAnnualInstallmentFormatted: "PKR 2,25,000",
    biAnnualCount: 6,
    possessionAmount: 900000,
    possessionAmountFormatted: "PKR 9,00,000",
    sector: "Sector A (Block B)",
    description: "Ideal for first-time buyers or small families looking for manageable installments in Sector A.",
    dimensions: "25' × 45' (approx.)",
    features: ["RDA Approved", "Underground Wiring (Sec A)", "Gated Security", "Near Central Park"]
  },
  {
    size: "10 Marla",
    category: "residential",
    totalPrice: 8250000,
    totalPriceFormatted: "PKR 82,50,000",
    bookingPercent: 10,
    bookingAmount: 825000,
    bookingAmountFormatted: "PKR 8,25,000",
    allocationPercent: 10,
    allocationAmount: 825000,
    allocationAmountFormatted: "PKR 8,25,000",
    monthlyInstallment: 82500,
    monthlyInstallmentFormatted: "PKR 82,500",
    monthlyCount: 30,
    biAnnualInstallment: 412500,
    biAnnualInstallmentFormatted: "PKR 4,12,500",
    biAnnualCount: 6,
    possessionAmount: 1650000,
    possessionAmountFormatted: "PKR 16,50,000",
    sector: "Sector A (Block B)",
    description: "Spacious layout suited for growing families desiring space for two or three floors with a garden.",
    dimensions: "35' × 65' (approx.)",
    features: ["Prime Location", "Wide Carpeted Road", "Water Filtration Access", "Community Mosque Nearby"]
  },
  {
    size: "1 Kanal",
    category: "residential",
    totalPrice: 15500000,
    totalPriceFormatted: "PKR 1,55,00,000",
    bookingPercent: 10,
    bookingAmount: 1550000,
    bookingAmountFormatted: "PKR 15,50,000",
    allocationPercent: 10,
    allocationAmount: 1550000,
    allocationAmountFormatted: "PKR 15,50,000",
    monthlyInstallment: 155000,
    monthlyInstallmentFormatted: "PKR 1,55,000",
    monthlyCount: 30,
    biAnnualInstallment: 775000,
    biAnnualInstallmentFormatted: "PKR 7,75,000",
    biAnnualCount: 6,
    possessionAmount: 3100000,
    possessionAmountFormatted: "PKR 31,00,000",
    sector: "Sector A (Block B)",
    description: "Prestigious living standard for custom luxury villas and expansive estates.",
    dimensions: "50' × 90' (approx.)",
    features: ["Boulevard Frontage Options", "Dedicated Green Belt", "Exclusive Security Protocol", "High Appreciation Potential"]
  }
];

export const COMMERCIAL_PRICES: PlotPriceInfo[] = [
  {
    size: "Signature Commercial (5.33 Marla)",
    category: "commercial",
    totalPrice: 15500000,
    totalPriceFormatted: "PKR 1,55,00,000 (Net)",
    bookingPercent: 22.58,
    bookingAmount: 3500000,
    bookingAmountFormatted: "PKR 35,00,000",
    allocationPercent: 0,
    allocationAmount: 0,
    allocationAmountFormatted: "Included in Down Payment",
    monthlyInstallment: 250000,
    monthlyInstallmentFormatted: "PKR 2,50,000",
    monthlyCount: 36,
    biAnnualInstallment: 0,
    biAnnualInstallmentFormatted: "Included in monthly",
    biAnnualCount: 0,
    possessionAmount: 3000000,
    possessionAmountFormatted: "PKR 30,00,000",
    sector: "Signature Commercial Block",
    description: "30×40 (5.33 Marla) with Total 2 Crore, 45 Lac Discount. 3-Year Flexible Payment Plan.",
    dimensions: "30' × 40' (5.33 Marla)",
    features: ["30×40 Prime Size", "PKR 45 Lac Discount", "Main Commercial Boulevard", "RDA Approved"]
  },
  {
    size: "4 Marla Commercial",
    category: "commercial",
    totalPrice: 22000000,
    totalPriceFormatted: "PKR 2,20,00,000",
    bookingPercent: 10,
    bookingAmount: 2200000,
    bookingAmountFormatted: "PKR 22,00,000",
    allocationPercent: 10,
    allocationAmount: 2200000,
    allocationAmountFormatted: "PKR 22,00,000",
    monthlyInstallment: 469333,
    monthlyInstallmentFormatted: "PKR 4,69,333",
    monthlyCount: 30,
    biAnnualInstallment: 586667,
    biAnnualInstallmentFormatted: "PKR 5,86,667",
    biAnnualCount: 6,
    possessionAmount: 4400000,
    possessionAmountFormatted: "PKR 44,00,000",
    sector: "GT Road Frontage Commercial Block",
    description: "Ideal for retail units, corporate offices, or high-yield rental properties.",
    dimensions: "30' × 30' (approx.)",
    features: ["Direct GT Road / N-5 Visibility", "High Footfall Zone", "Dedicated Customer Parking", "Multi-Storey Permission"]
  },
  {
    size: "8 Marla Commercial",
    category: "commercial",
    totalPrice: 42000000,
    totalPriceFormatted: "PKR 4,20,00,000",
    bookingPercent: 10,
    bookingAmount: 4200000,
    bookingAmountFormatted: "PKR 42,00,000",
    allocationPercent: 10,
    allocationAmount: 4200000,
    allocationAmountFormatted: "PKR 42,00,000",
    monthlyInstallment: 896000,
    monthlyInstallmentFormatted: "PKR 8,96,000",
    monthlyCount: 30,
    biAnnualInstallment: 1120000,
    biAnnualInstallmentFormatted: "PKR 11,20,000",
    biAnnualCount: 6,
    possessionAmount: 8400000,
    possessionAmountFormatted: "PKR 84,00,000",
    sector: "GT Road Frontage Commercial Block",
    description: "Prime plaza or food-court scale plot built for maximum business exposure.",
    dimensions: "40' × 45' (approx.)",
    features: ["Corner & Boulevard Options", "Maximum Commercial Exposure", "Dedicated Loading & Parking", "High Rental Yield"]
  }
];

export const HOME_OVERVIEW = {
  headline: "Invest in Premium Living at Saffron City",
  subheadline: "A new residential community on GT Road, designed for families and investors who want secure ownership with easy installments.",
  bodyText1: "Saffron City is a residential development spread across 15,000 Kanal near Rawat, sitting between Islamabad and Rawalpindi on Main GT Road. The project is being developed by Saadullah Khan and Brothers (SKB), a construction group with decades of regional experience, and is aimed at buyers who want a planned community with clear legal standing rather than an unverified file-based scheme.",
  bodyText2: "The society offers residential plots in 5 Marla, 10 Marla, and 1 Kanal sizes, with a payment structure built around manageable monthly and bi-annual installments instead of a single lump-sum purchase. Its location near Rawat puts it within reach of both cities, while still offering the lower density and quieter setting many buyers look for outside the core urban areas.",
  vision: "To build a community where thoughtful planning, modern infrastructure, and everyday livability come together.",
  mission: "To deliver housing that buyers can trust — legally sound, transparently priced, and built to a consistent standard.",
  quickStats: [
    { label: "NOC Approved", value: "RDA", sub: "Fully Cleared" },
    { label: "Master Plan", value: "15,000", sub: "Kanal Land Area" },
    { label: "Down Payment", value: "10%", sub: "Easy 3-Year Plan" }
  ]
};

export const DEVELOPER_INFO = {
  heading: "Developed by SKB Group — Approved by RDA",
  bodyText: "Saffron City is being developed by Saadullah Khan and Brothers (SKB Group), a premier infrastructure and real estate consortium with over 70 years of engineering excellence operating across Pakistan, the Middle East, and internationally. Led by Chairman Malik Tariq Mehmood, the group is committed to delivering a world-class, master-planned residential and commercial hub on Main GT Road, Rawat.",
  stats: [
    { value: "70+", label: "Years in Construction" },
    { value: "SKB", label: "Group Development" },
    { value: "RDA", label: "Approved NOC" },
    { value: "15,000", label: "Kanal Master Plan" }
  ],
  legalText: "Before investing in any land development, verifying legal authorization is critical. Saffron City holds a comprehensive No Objection Certificate (NOC) granted by the Rawalpindi Development Authority (RDA), covering the full 15,000 Kanal project expanse on GT Road Rawat.",
  legalDetails: {
    authority: "RDA (Rawalpindi Development Authority)",
    approvalDate: "RDA Approved",
    approvedArea: "15,000 Kanal",
    currentStatus: "Active Development"
  },
  ceoQuote: "We wanted to build an authentic, RDA-approved mega community that buyers and overseas Pakistanis can trust with complete transparency and peace of mind.",
  chairmanName: "Malik Tariq Mehmood",
  chairmanTitle: "Chairman, Saffron City & SKB Builders",
  chairmanImage: "/images/chairman_official_clean.png",
  projectImage: "/images/imgi_25_saffron-city-islamabad.jpg"
};

export const LANDMARKS: LandmarkDistance[] = [
  { name: "T-Chowk, Rawat", time: "~5–10 min", distance: "~5 km", category: "Local Access", description: "Direct GT Road junction & local transit hub." },
  { name: "Rawalpindi Ring Road", time: "~2 min", distance: "~2 km", category: "Highway Route", description: "Upcoming mega corridor connecting twin cities." },
  { name: "DHA Phase 2 & 3", time: "~2–10 min", distance: "~4 km", category: "Housing Society", description: "Established neighboring executive developments." },
  { name: "Bahria Town Rawalpindi", time: "~10 min", distance: "~8 km", category: "Housing Society", description: "Direct connectivity via GT Road." },
  { name: "Giga Mall", time: "~7–15 min", distance: "~10 km", category: "Commercial / Shopping", description: "Major retail, entertainment, and dining center." },
  { name: "Islamabad Expressway / Zero Point", time: "~20 min", distance: "~25 km", category: "City Centre", description: "Direct capital access without city bottlenecks." },
  { name: "Blue Area, Islamabad", time: "~25 min", distance: "~28 km", category: "Business District", description: "Islamabad's central financial district." },
  { name: "PIMS Hospital", time: "~25 min", distance: "~26 km", category: "Healthcare", description: "Premier tertiary healthcare institute." },
  { name: "International Islamic University", time: "~20 min", distance: "~22 km", category: "Education", description: "Major higher education institute." },
  { name: "New Islamabad International Airport", time: "~30 min", distance: "~35 km", category: "Airport", description: "Smooth highway transit for overseas travelers." }
];

export const ACCESS_ROUTES: AccessRoute[] = [
  {
    title: "Access via Islamabad Expressway",
    description: "Connects the capital's main commercial zones to GT Road near Rawat, making it the most direct route from Islamabad core without winding through congested streets.",
    direction: "North Entry"
  },
  {
    title: "Access via Rawat–Chakbeli Road",
    description: "Provides an alternative entry point from the south-east side of Rawat, connecting directly to GT Road close to the project site.",
    direction: "South-East Entry"
  },
  {
    title: "Access via Kallar Syedan Road",
    description: "Runs from the north and connects to GT Road on the outer edge of Rawat, allowing traffic from Kallar Syedan to bypass main Rawalpindi corridors.",
    direction: "North-East Entry"
  },
  {
    title: "Access via Rawalpindi Ring Road",
    description: "The planned Ring Road will provide rapid multi-lane bypass connections across the twin cities right into the Rawat GT Road corridor.",
    direction: "Bypass Corridor"
  }
];

export const AMENITIES = [
  {
    title: "Grand Mosque",
    icon: "Mosque",
    image: "/images/amenities/amenity_mosque.jpg",
    desc: "A central, magnificent mosque sized for the entire community, not just a single sector, featuring prayer halls and Islamic center."
  },
  {
    title: "Medical Centres",
    icon: "HeartPulse",
    image: "/images/amenities/amenity_hospital.jpg",
    desc: "On-site 24/7 healthcare access for everyday medical needs, diagnostic facilities, pharmacy, and rapid emergency response."
  },
  {
    title: "Educational Institutes",
    icon: "GraduationCap",
    image: "/images/amenities/amenity_school.jpg",
    desc: "Top-tier schools planned within safe walking distance of residential blocks, eliminating long bus commutes for children."
  },
  {
    title: "Gated Security & CCTV",
    icon: "ShieldCheck",
    image: "/images/amenities/amenity_security.jpg",
    desc: "3-tier gated perimeter with biometric checkpoints, round-the-clock patrol, and 24/7 CCTV surveillance at all entry points."
  },
  {
    title: "Shopping & F&B Hub",
    icon: "Store",
    image: "/images/amenities/amenity_shopping.jpg",
    desc: "Retail and food outlets built into the community frontage on GT Road rather than requiring a drive into crowded city centers."
  },
  {
    title: "Wide Road Network",
    icon: "Navigation",
    image: "/images/amenities/amenity_boulevard.jpg",
    desc: "Planned 250-foot Main Boulevard and wide carpeted internal roads engineered to eliminate bottlenecks common in older societies."
  },
  {
    title: "Water Filtration Plant & Grid",
    icon: "Droplets",
    image: "/images/amenities/amenity_water.jpg",
    desc: "Dedicated RO water filtration plant for safe drinking water, coupled with a dedicated power grid station for stable utility supply."
  },
  {
    title: "Family Parks & Green Belts",
    icon: "Trees",
    image: "/images/amenities/amenity_park.jpg",
    desc: "Over 45% land allocated to greenery, parks, jogging tracks, and open play zones distributed across all residential sectors."
  }
];

export const SECTORS = [
  {
    id: "sector-a",
    name: "Sector A Residential",
    type: "Premium Residential",
    tagline: "Wider Roads & Underground Utilities",
    description: "Positioned as the flagship residential sector within Saffron City, Sector A features wider carpeted roads, underground electrification, dedicated gated access, and closest proximity to the Central Park and school zones.",
    features: [
      "Underground utility lines (electricity, gas, optical fiber)",
      "Extra-wide carpeted internal roads",
      "Direct boulevard access",
      "Immediate proximity to Grand Mosque & Schools"
    ],
    priceStarting: "PKR 45 Lakh",
    status: "Active Development"
  },
  {
    id: "sector-b",
    name: "Sector B Residential",
    type: "Family & Investor Friendly",
    tagline: "Structured 3-Year Installments",
    description: "Sector B is the budget-friendly residential sector built around an accessible 3-year installment plan with a 10% down payment. It features its own community mosque, family parks, and fully planned utility infrastructure.",
    features: [
      "10% down payment entry point",
      "Same RDA NOC legal standing",
      "Community mosque & dedicated sector parks",
      "Shared civic facilities & gated perimeter"
    ],
    priceStarting: "PKR 45 Lakh",
    status: "Active Development"
  },
  {
    id: "commercial-block",
    name: "Commercial Block",
    type: "Highway Frontage Retail & Plaza",
    tagline: "Direct GT Road (N-5) Exposure",
    description: "Situated directly along the busy GT Road (N-5 Highway) frontage, completely separated from residential blocks. Plots in 5.33 Marla (30×40), 4 Marla and 8 Marla sizes are engineered for high-traffic retail, corporate offices, and food hubs with dedicated customer parking.",
    features: [
      "Direct frontage on Pakistan's premier N-5 corridor",
      "Dedicated multi-vehicle commercial parking",
      "Multi-storey commercial building permissions",
      "High rental yield & passing commuter footfall"
    ],
    priceStarting: "PKR 1.55 Crore (Net)",
    status: "Pre-Launch Bookings"
  },
  {
    id: "green-zone",
    name: "Green & Community Zone",
    type: "Civic & Recreational",
    tagline: "Parks, Sports Grounds & Grand Mosque",
    description: "The shared green heart of Saffron City comprising the Grand Mosque, expansive family parks, sports grounds, community hall, and tree-lined walkways connecting all sectors together.",
    features: [
      "Grand Community Mosque",
      "Outdoor fitness & sports facilities",
      "Community hall for resident events",
      "45% overall open green space allocation"
    ],
    priceStarting: "Community Amenity",
    status: "Under Development"
  }
];

export const BOOKING_STEPS = [
  {
    step: 1,
    title: "Choose Your Plot",
    desc: "Decide on your desired plot size: 5 Marla, 10 Marla, 1 Kanal residential, or 5.33 Marla (30×40) / 4 Marla / 8 Marla commercial based on your budget and goals."
  },
  {
    step: 2,
    title: "Confirm Availability & Pricing",
    desc: "Connect with our sales team to verify current available inventory in Sector A (Block B), Sector B, or the Signature Commercial block."
  },
  {
    step: 3,
    title: "Prepare Your Documents",
    desc: "Collect applicant CNIC copy, next-of-kin CNIC copy, 2 passport-size photographs, and NICOP copy if applying from overseas."
  },
  {
    step: 4,
    title: "Submit Your Application",
    desc: "Complete the official booking application form with your verified particulars and sector preferences."
  },
  {
    step: 5,
    title: "Pay the Booking Amount",
    desc: "Pay the 10% down payment via bank transfer, demand draft / pay order in favor of the developer, or cash at the site office."
  },
  {
    step: 6,
    title: "Receive Your Allotment Letter",
    desc: "Receive your officially stamped Allotment Letter followed by your customized 3-year installment payment schedule."
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "1",
    quote: "Saffron City ki location waqai behtareen hai. GT Road par mojood hone ki wajah se access bohat asaan hai.",
    author: "Ahmed Khan",
    location: "Rawalpindi",
    role: "Verified Plot Buyer",
    rating: 5,
    image: "/images/avatars/avatar_ahmed.jpg"
  },
  {
    id: "2",
    quote: "Payment plan bohat flexible aur investor-friendly hai. Booking process pura transparent tha.",
    author: "Muhammad Ali",
    location: "Islamabad",
    role: "Overseas Investor",
    rating: 5,
    image: "/images/avatars/avatar_muhammad.jpg"
  },
  {
    id: "3",
    quote: "Security, infrastructure aur future development plans Saffron City ko doosri housing societies se munfarid banate hain.",
    author: "Zainab Malik",
    location: "Islamabad",
    role: "Residential Buyer",
    rating: 5,
    image: "/images/avatars/avatar_zainab.jpg"
  }
];

export const HOME_FAQS: FaqItem[] = [
  {
    question: "Is Saffron City legally approved?",
    answer: "Yes. The project holds an official No Objection Certificate (NOC) from the Rawalpindi Development Authority (RDA) for the 15,000 Kanal site."
  },
  {
    question: "What plot sizes can I buy?",
    answer: "Residential plots are available in 5 Marla, 10 Marla, and 1 Kanal sizes in Sector A (Block B) and Sector B. Commercial plots are available in Signature 30×40 (5.33 Marla), 4 Marla, and 8 Marla on GT Road frontage."
  },
  {
    question: "How does the payment plan work?",
    answer: "Residential plots have a 10% booking payment, 10% allocation payment, 30 monthly installments, 6 bi-annual installments, and 20% on possession over 3 years. Signature Commercial has a down payment of 35 Lac with monthly installments of 250,000."
  },
  {
    question: "How do I book a plot?",
    answer: "You can book directly by reaching out through our website enquiry form, calling us at 03331113551, messaging our sales team on WhatsApp, or visiting our site office on Main GT Road, Rawat."
  },
  {
    question: "When will possession be given?",
    answer: "Development is actively progressing on the ground with the main gate and 250-foot boulevard underway. Possession will be handed over in phases in line with installment milestones."
  },
  {
    question: "Is the location far from Islamabad?",
    answer: "No. Saffron City sits on Main GT Road near Rawat, roughly 20 minutes from the Islamabad Expressway / Zero Point and 30 minutes from New Islamabad International Airport."
  }
];

export const LEADERSHIP = [
  {
    name: "Malik Tariq Mehmood",
    role: "Chairman",
    bio: "Guiding the strategic vision and institutional governance of Saffron City with over three decades of business and infrastructure leadership.",
    image: "/images/chairman_portrait_hd.png"
  },
  {
    name: "Ali Muhammad",
    role: "Chief Executive Officer",
    bio: "Leading day-to-day corporate operations, financial structuring, and transparent investor relations across domestic and overseas markets.",
    image: "/images/imgi_8_ceo-150x150.png"
  },
  {
    name: "Haroon Awan",
    role: "Project Director",
    bio: "Overseeing on-site engineering, master planning execution, contractor coordination, and timely delivery of infrastructure.",
    image: "/images/imgi_9_director-150x150.jpg"
  }
];

export const TIMELINE_MILESTONES = [
  { year: "1954", milestone: "SKB Builders established in Pakistan by the late Saadullah Khan." },
  { year: "2009", milestone: "Land acquisition and strategic planning for Saffron City begins." },
  { year: "2012", milestone: "Master plan development: residential, commercial, educational, and green zones." },
  { year: "2015", milestone: "Official project launch; residential plot bookings commence." },
  { year: "2018", milestone: "Major infrastructure development: roads, utilities, sewerage, electricity." },
  { year: "2021", milestone: "Project expansion: additional residential sectors and commercial planning." },
  { year: "2024", milestone: "RDA NOC approval process completed; community development actively progressing." },
  { year: "2026", milestone: "Sector A (Block B) and Signature Commercial active; ongoing development activities." }
];

export const DIFFERENTIATORS = [
  {
    number: "01",
    title: "RDA Approved — Verified Legal Standing",
    desc: "The NOC is approved and independently verifiable on the RDA portal. You are not investing on a promise of future compliance; the project already meets full regulatory standards."
  },
  {
    number: "02",
    title: "Developer with 70+ Years Track Record",
    desc: "SKB Builders has been delivering major civil and commercial construction projects since 1954 across Pakistan and the Middle East, mitigating the region's single biggest developer risk factor."
  },
  {
    number: "03",
    title: "Master Plan Built for Community Life",
    desc: "The layout integrates residential zones with commercial areas, educational facilities, healthcare access, parks, and arterial road networks rather than simply packing plots."
  },
  {
    number: "04",
    title: "Infrastructure That Precedes Residents",
    desc: "Roads, boundary walls, and underground utilities are developed before encouraging construction, ensuring physical progress supports your plot investment."
  },
  {
    number: "05",
    title: "Prime GT Road Location",
    desc: "Main GT Road, Rawat places Saffron City within direct reach of both Rawalpindi and Islamabad, with immediate connectivity to the upcoming Ring Road without central price inflation."
  },
  {
    number: "06",
    title: "Transparent Communication",
    desc: "From payment plans to honest development progress updates, Saffron City maintains open communication with plot holders regarding milestones and realistic timelines."
  },
  {
    number: "07",
    title: "Designed for Every Buyer Profile",
    desc: "Structured installment options for first-time buyers, long-term capital appreciation for seasoned investors, and seamless remote coordination for overseas Pakistanis."
  }
];

export const CORE_VALUES = [
  { title: "Transparency", desc: "Every buyer deserves to know what they are purchasing, what the current development status is, and what the realistic timeline looks like." },
  { title: "Trust", desc: "Trust is earned over time through consistent action. Purchasing a plot is one of the most significant financial decisions a family makes, and we honor that." },
  { title: "Quality", desc: "From road networks to community facilities, every component is built to serve residents for decades — not just to pass a superficial inspection." },
  { title: "Community", desc: "A housing society without community is just land divided into rectangles. Saffron City fosters neighborly living through shared spaces and accessible amenities." },
  { title: "Sustainability", desc: "Generous green space ratios, dedicated water filtration, and environmentally responsible drainage are embedded in the master plan." },
  { title: "Long-Term Value", desc: "We are not optimizing for the fastest sale cycle. We are building something that should be worth substantially more financially and experientially in ten years." }
];

export const COMPARISON_TABLE = [
  {
    factor: "Legal Status",
    saffronCity: "RDA NOC Approved",
    dhaPhase2: "Fully established, legally recognised",
    bahriaTown: "Privately approved, self-managed"
  },
  {
    factor: "Plot Availability",
    saffronCity: "Open for booking (new rates)",
    dhaPhase2: "Limited resale market",
    bahriaTown: "Multiple sizes across phases"
  },
  {
    factor: "Entry Price (5 Marla)",
    saffronCity: "PKR 45,00,000",
    dhaPhase2: "Significantly higher (cash)",
    bahriaTown: "PKR 55,00,000+ depending on phase"
  },
  {
    factor: "Payment Structure",
    saffronCity: "Flexible 3-Year Installment Plan (10% Down)",
    dhaPhase2: "Mostly lump-sum resale transactions",
    bahriaTown: "Varies by phase, mostly cash / short plans"
  },
  {
    factor: "Development Stage",
    saffronCity: "Pre-launch, active on-ground development",
    dhaPhase2: "Fully built out",
    bahriaTown: "Fully operational older phases"
  },
  {
    factor: "Target Buyer",
    saffronCity: "First-time buyers, installment investors, overseas",
    dhaPhase2: "Established investors, lump-sum cash buyers",
    bahriaTown: "Immediate construction buyers with full capital"
  }
];
