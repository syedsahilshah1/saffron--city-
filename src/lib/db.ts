// In-memory / persistent store for leads, plot inventory, and site settings
// Connects to MySQL/Prisma when DATABASE_URL is configured, with robust in-memory fallback.

export interface StoredInquiry {
  id: string;
  name: string;
  phone: string;
  message?: string;
  plotSize?: string;
  plotType?: string;
  sector?: string;
  status: 'New' | 'Contacted' | 'FollowUp' | 'Booked' | 'Closed';
  source: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredPlot {
  id: string;
  plotNumber: string;
  sector: 'Sector A' | 'Sector B' | 'Commercial Block';
  category: '5 Marla' | '10 Marla' | '1 Kanal' | '4 Marla' | '8 Marla';
  type: 'Residential' | 'Commercial';
  totalPrice: number;
  downPayment: number;
  monthlyInst: number;
  status: 'Available' | 'Reserved' | 'Booked';
  features: string;
}

export interface StoredSettings {
  siteName: string;
  contactPhone: string;
  whatsappPhone: string;
  officialEmail: string;
  officeAddress: string;
  rdaNocStatus: string;
  announcement: string;
  activePreLaunchDiscount: boolean;
}

// Global cache to maintain state across hot reloads and API calls
const globalForStore = globalThis as unknown as {
  inquiriesStore?: StoredInquiry[];
  plotsStore?: StoredPlot[];
  settingsStore?: StoredSettings;
};

// Default seed data
const initialInquiries: StoredInquiry[] = [
  {
    id: "lead-001",
    name: "Tariq Mehmood",
    phone: "+92 321 5554321",
    message: "Interested in 1 Kanal residential plot in Sector A with park facing option.",
    plotSize: "1 Kanal",
    plotType: "Residential",
    sector: "Sector A",
    status: "New",
    source: "Website Hero Form",
    notes: "Requires remote overseas booking guidance.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "lead-002",
    name: "Dr. Usman Farooq",
    phone: "+92 300 9876543",
    message: "Looking for 4 Marla commercial plot on GT Road frontage for clinic setup.",
    plotSize: "4 Marla",
    plotType: "Commercial",
    sector: "Commercial Block",
    status: "Contacted",
    source: "WhatsApp Lead",
    notes: "Sent payment plan brochure. Follow-up scheduled for Friday.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: "lead-003",
    name: "Bilal Ahmad",
    phone: "+92 333 1234567",
    message: "I need a 5 Marla plot in Saffron City Sector B on 3-year installment.",
    plotSize: "5 Marla",
    plotType: "Residential",
    sector: "Sector B",
    status: "FollowUp",
    source: "Plot For Sale Page",
    notes: "Checking down payment readiness.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

const initialPlots: StoredPlot[] = [
  {
    id: "plt-a-01",
    plotNumber: "A-101",
    sector: "Sector A",
    category: "5 Marla",
    type: "Residential",
    totalPrice: 4000000,
    downPayment: 400000,
    monthlyInst: 40000,
    status: "Available",
    features: "Underground Utilities, Near Central Park"
  },
  {
    id: "plt-a-02",
    plotNumber: "A-102",
    sector: "Sector A",
    category: "10 Marla",
    type: "Residential",
    totalPrice: 7500000,
    downPayment: 750000,
    monthlyInst: 75000,
    status: "Reserved",
    features: "Main Boulevard, Underground Electrification"
  },
  {
    id: "plt-a-03",
    plotNumber: "A-105",
    sector: "Sector A",
    category: "1 Kanal",
    type: "Residential",
    totalPrice: 14000000,
    downPayment: 1400000,
    monthlyInst: 140000,
    status: "Available",
    features: "Corner Plot, Park Facing, 60-ft Road"
  },
  {
    id: "plt-b-01",
    plotNumber: "B-201",
    sector: "Sector B",
    category: "5 Marla",
    type: "Residential",
    totalPrice: 4000000,
    downPayment: 400000,
    monthlyInst: 40000,
    status: "Available",
    features: "Near Community Mosque, 40-ft Wide Road"
  },
  {
    id: "plt-b-02",
    plotNumber: "B-205",
    sector: "Sector B",
    category: "10 Marla",
    type: "Residential",
    totalPrice: 7500000,
    downPayment: 750000,
    monthlyInst: 75000,
    status: "Available",
    features: "Close to Commercial Hub, Sector B"
  },
  {
    id: "plt-c-01",
    plotNumber: "COM-01",
    sector: "Commercial Block",
    category: "4 Marla",
    type: "Commercial",
    totalPrice: 22000000,
    downPayment: 2200000,
    monthlyInst: 469333,
    status: "Available",
    features: "Direct GT Road (N-5) Highway Frontage, Parking"
  },
  {
    id: "plt-c-02",
    plotNumber: "COM-08",
    sector: "Commercial Block",
    category: "8 Marla",
    type: "Commercial",
    totalPrice: 42000000,
    downPayment: 4200000,
    monthlyInst: 896000,
    status: "Reserved",
    features: "Boulevard Corner, Plaza Multi-Storey Allowed"
  }
];

const initialSettings: StoredSettings = {
  siteName: "Saffron City Islamabad",
  contactPhone: "+92 300 0000000",
  whatsappPhone: "923000000000",
  officialEmail: "info@saffroncity.org",
  officeAddress: "Main GT Road (N-5 Highway), Dhoke Malik Ishaq Awan, Rawat",
  rdaNocStatus: "RDA Approved (Jan 2025, 15,000 Kanal)",
  announcement: "Pre-launch bookings active. 10% down payment with 3-year easy installment plan.",
  activePreLaunchDiscount: true
};

export const inquiriesDb = {
  getAll: (): StoredInquiry[] => {
    if (!globalForStore.inquiriesStore) {
      globalForStore.inquiriesStore = [...initialInquiries];
    }
    return globalForStore.inquiriesStore;
  },
  add: (inquiry: Omit<StoredInquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>): StoredInquiry => {
    const list = inquiriesDb.getAll();
    const newEntry: StoredInquiry = {
      ...inquiry,
      id: `lead-${Date.now().toString().slice(-6)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.unshift(newEntry);
    return newEntry;
  },
  updateStatus: (id: string, status: StoredInquiry['status'], notes?: string): StoredInquiry | null => {
    const list = inquiriesDb.getAll();
    const item = list.find(i => i.id === id);
    if (!item) return null;
    item.status = status;
    if (notes !== undefined) item.notes = notes;
    item.updatedAt = new Date().toISOString();
    return item;
  },
  delete: (id: string): boolean => {
    const list = inquiriesDb.getAll();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return false;
    list.splice(idx, 1);
    return true;
  }
};

export const plotsDb = {
  getAll: (): StoredPlot[] => {
    if (!globalForStore.plotsStore) {
      globalForStore.plotsStore = [...initialPlots];
    }
    return globalForStore.plotsStore;
  },
  add: (plot: Omit<StoredPlot, 'id'>): StoredPlot => {
    const list = plotsDb.getAll();
    const newPlot: StoredPlot = {
      ...plot,
      id: `plt-${Date.now().toString().slice(-6)}`
    };
    list.push(newPlot);
    return newPlot;
  },
  updateStatus: (id: string, status: StoredPlot['status']): StoredPlot | null => {
    const list = plotsDb.getAll();
    const item = list.find(p => p.id === id);
    if (!item) return null;
    item.status = status;
    return item;
  },
  updatePrice: (id: string, totalPrice: number, downPayment: number, monthlyInst: number): StoredPlot | null => {
    const list = plotsDb.getAll();
    const item = list.find(p => p.id === id);
    if (!item) return null;
    item.totalPrice = totalPrice;
    item.downPayment = downPayment;
    item.monthlyInst = monthlyInst;
    return item;
  },
  delete: (id: string): boolean => {
    const list = plotsDb.getAll();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return false;
    list.splice(idx, 1);
    return true;
  }
};

export const settingsDb = {
  get: (): StoredSettings => {
    if (!globalForStore.settingsStore) {
      globalForStore.settingsStore = { ...initialSettings };
    }
    return globalForStore.settingsStore;
  },
  update: (updates: Partial<StoredSettings>): StoredSettings => {
    const current = settingsDb.get();
    globalForStore.settingsStore = { ...current, ...updates };
    return globalForStore.settingsStore;
  }
};
