import { NetWorthSummary as NetWorthSummaryType } from "@/types/netWorth";

interface NetWorthSummaryProps {
  summary: NetWorthSummaryType;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const NetWorthSummary = ({ summary }: NetWorthSummaryProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Net Worth</h2>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between">
          <span>Total Assets</span>
          <span>{formatCurrency(summary.totalAssets)}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Liabilities</span>
          <span>{formatCurrency(summary.totalLiabilities)}</span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
          <span>Net Worth</span>
          <span>{formatCurrency(summary.netWorth)}</span>
        </div>
      </div>
    </section>
  );
};

export default NetWorthSummary;