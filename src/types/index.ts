export interface PlotPriceInfo {
  size: string;
  category: 'residential' | 'commercial';
  totalPrice: number;
  totalPriceFormatted: string;
  bookingPercent: number;
  bookingAmount: number;
  bookingAmountFormatted: string;
  allocationPercent: number;
  allocationAmount: number;
  allocationAmountFormatted: string;
  monthlyInstallment: number;
  monthlyInstallmentFormatted: string;
  monthlyCount: number;
  biAnnualInstallment: number;
  biAnnualInstallmentFormatted: string;
  biAnnualCount: number;
  possessionAmount: number;
  possessionAmountFormatted: string;
  sector: string;
  description: string;
  dimensions?: string;
  features: string[];
}

export interface LandmarkDistance {
  name: string;
  time: string;
  distance?: string;
  category: string;
  description?: string;
}

export interface AccessRoute {
  title: string;
  description: string;
  direction: string;
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  image?: string;
  role?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  message?: string;
  plotSize?: string;
  plotType?: string;
  sector?: string;
  status: 'New' | 'Contacted' | 'FollowUp' | 'Booked' | 'Closed';
  createdAt: string;
}
