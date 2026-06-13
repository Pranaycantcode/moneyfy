import { RecurringTransaction } from "@/types/recurringTransaction";

interface RecurringTransactionsListProps {
  recurringTransactions: RecurringTransaction[];
  onToggleRecurringTransaction: (id: string) => Promise<void>;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const RecurringTransactionsList = ({
  recurringTransactions,
  onToggleRecurringTransaction,
}: RecurringTransactionsListProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Recurring Transactions</h2>
      <p className="mt-1 text-sm text-slate-400">
        Automated income and expense schedules
      </p>

      <div className="mt-5 space-y-3">
        {recurringTransactions.map((item) => (
          <div key={item.id} className="rounded-xl bg-slate-900/80 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {item.category} • {item.frequency} • Next:{" "}
                  {formatDate(item.nextRunDate)}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={
                    item.type === "INCOME"
                      ? "font-semibold text-emerald-400"
                      : "font-semibold text-red-400"
                  }
                >
                  {item.type === "INCOME" ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </p>

                <button
                  onClick={() => onToggleRecurringTransaction(item.id)}
                  className="mt-2 rounded-lg bg-white/10 px-3 py-1 text-xs text-slate-300"
                >
                  {item.isActive ? "Pause" : "Resume"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {recurringTransactions.length === 0 && (
          <p className="text-sm text-slate-500">
            No recurring transactions added yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default RecurringTransactionsList;