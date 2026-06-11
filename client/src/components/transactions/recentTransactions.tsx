import { Transaction } from "@/types/transaction";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <p className="text-sm text-slate-400">Latest activity in your account</p>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-xl bg-slate-900/80 p-4"
          >
            <div>
              <h3 className="font-medium">{transaction.title}</h3>
              <p className="text-sm text-slate-400">
                {transaction.category} • {transaction.date}
              </p>
            </div>

            <p
              className={
                transaction.type === "INCOME"
                  ? "font-semibold text-emerald-400"
                  : "font-semibold text-red-400"
              }
            >
              {transaction.type === "INCOME" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTransactions;