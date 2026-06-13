import { BudgetSummary } from "@/types/budget";

interface BudgetProgressListProps {
  budgets: BudgetSummary[];
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const getStatusLabel = (status: BudgetSummary["status"]) => {
  switch (status) {
    case "OVER_BUDGET":
      return "Over budget";
    case "WARNING":
      return "Near limit";
    default:
      return "On track";
  }
};

const BudgetProgressList = ({ budgets }: BudgetProgressListProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Budget Progress</h2>
      <p className="mt-1 text-sm text-slate-400">
        Compare monthly budget limits against actual spending
      </p>

      <div className="mt-5 space-y-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="rounded-xl bg-slate-900/80 p-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{budget.category}</h3>
                <p className="text-sm text-slate-400">
                  {formatCurrency(budget.spent)} spent of{" "}
                  {formatCurrency(budget.limit)}
                </p>
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                {getStatusLabel(budget.status)}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-orange-300"
                style={{ width: `${Math.min(budget.usedPercentage, 100)}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
              <span>{budget.usedPercentage}% used</span>
              <span>{formatCurrency(budget.remaining)} remaining</span>
            </div>
          </div>
        ))}

        {budgets.length === 0 && (
          <p className="text-sm text-slate-500">
            No budgets added for this month yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default BudgetProgressList;