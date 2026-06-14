import { AccountSummary as AccountSummaryType } from "@/types/account";

interface AccountSummaryProps {
  summary: AccountSummaryType;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const AccountSummary = ({ summary }: AccountSummaryProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Accounts Summary</h2>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between">
          <span>Total Account Balance</span>
          <span className="font-semibold">
            {formatCurrency(summary.totalBalance)}
          </span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Accounts Connected</span>
          <span>{summary.accountCount}</span>
        </div>
      </div>
    </section>
  );
};

export default AccountSummary;