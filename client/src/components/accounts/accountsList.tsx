import { Account } from "@/types/account";

interface AccountsListProps {
  accounts: Account[];
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const AccountsList = ({ accounts }: AccountsListProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Accounts</h2>
      <p className="mt-1 text-sm text-slate-400">
        View all your financial accounts
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <div key={account.id} className="rounded-xl bg-slate-900/80 p-4">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-sm text-slate-400">{account.type}</p>
              </div>

              <span className="font-semibold">
                {formatCurrency(account.balance)}
              </span>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <p className="text-sm text-slate-500">No accounts added yet.</p>
        )}
      </div>
    </section>
  );
};

export default AccountsList;