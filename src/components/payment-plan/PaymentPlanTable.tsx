import React from "react";
import { RESIDENTIAL_PRICES } from "@/data/saffron-data";

interface PaymentPlanTableProps {
  className?: string;
}

export default function PaymentPlanTable({ className = "" }: PaymentPlanTableProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-amber-300/90 bg-[#FFFDF7] shadow-lg shadow-amber-950/5 ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-[#FFF9EA] text-[11px] sm:text-xs font-bold tracking-wider text-[#9B6A34] uppercase">
              <th className="border border-amber-200/90 py-4 sm:py-5 px-4 sm:px-6">PLOT SIZE</th>
              <th className="border border-amber-200/90 py-4 sm:py-5 px-4 sm:px-6">TOTAL PRICE</th>
              <th className="border border-amber-200/90 py-4 sm:py-5 px-4 sm:px-6">BOOKING (10%)</th>
              <th className="border border-amber-200/90 py-4 sm:py-5 px-4 sm:px-6">ALLOCATION (10%)</th>
              <th className="border border-amber-200/90 py-4 sm:py-5 px-4 sm:px-6">30 MONTHLY INST.</th>
              <th className="border border-amber-200/90 py-4 sm:py-5 px-4 sm:px-6">6 BI-ANNUAL INST.</th>
              <th className="border border-amber-200/90 py-4 sm:py-5 px-4 sm:px-6">POSSESSION (20%)</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {RESIDENTIAL_PRICES.map((plot) => (
              <tr
                key={plot.size}
                className="hover:bg-amber-50/60 transition-colors"
              >
                <td className="border border-amber-200/80 py-4 sm:py-5 px-4 sm:px-6 font-bold text-slate-900 text-sm sm:text-base">
                  {plot.size}
                </td>
                <td className="border border-amber-200/80 py-4 sm:py-5 px-4 sm:px-6 font-bold text-[#D49E17] text-sm sm:text-base">
                  {plot.totalPriceFormatted}
                </td>
                <td className="border border-amber-200/80 py-4 sm:py-5 px-4 sm:px-6 text-slate-700 text-sm">
                  {plot.bookingAmountFormatted}
                </td>
                <td className="border border-amber-200/80 py-4 sm:py-5 px-4 sm:px-6 text-slate-700 text-sm">
                  {plot.allocationAmountFormatted}
                </td>
                <td className="border border-amber-200/80 py-4 sm:py-5 px-4 sm:px-6 text-slate-700 text-sm">
                  {plot.monthlyInstallmentFormatted}
                </td>
                <td className="border border-amber-200/80 py-4 sm:py-5 px-4 sm:px-6 text-slate-700 text-sm">
                  {plot.biAnnualInstallmentFormatted}
                </td>
                <td className="border border-amber-200/80 py-4 sm:py-5 px-4 sm:px-6 font-bold text-slate-900 text-sm sm:text-base">
                  {plot.possessionAmountFormatted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
