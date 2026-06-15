import { Account, AccountSummary } from "@/types/account";

interface DashboardAccountOverviewProps {
  accounts: Account[];
  summary: AccountSummary;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const DashboardAccountOverview = ({
  accounts,
  summary,
}: DashboardAccountOverviewProps) => {
  const topAccounts = [...accounts]
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 3);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Accounts Overview</h2>
        <p className="text-sm text-slate-400">
          Snapshot of your active account balances
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-slate-900/80 p-4">
          <p className="text-sm text-slate-400">Total Account Balance</p>
          <h3 className="mt-2 text-2xl font-semibold">
            {formatCurrency(summary.totalBalance)}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-900/80 p-4">
          <p className="text-sm text-slate-400">Accounts</p>
          <h3 className="mt-2 text-2xl font-semibold">
            {summary.accountCount}
          </h3>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {topAccounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between rounded-xl bg-slate-900/80 p-4"
          >
            <div>
              <h3 className="font-medium">{account.name}</h3>
              <p className="text-sm text-slate-400">{account.type}</p>
            </div>

            <span className="font-semibold">
              {formatCurrency(account.balance)}
            </span>
          </div>
        ))}

        {topAccounts.length === 0 && (
          <p className="text-sm text-slate-500">No accounts added yet.</p>
        )}
      </div>
    </section>
  );
};

export default DashboardAccountOverview;