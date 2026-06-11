import { NetWorthItem } from "@/types/netWorth";

interface NetWorthListProps {
  items: NetWorthItem[];
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const NetWorthList = ({ items }: NetWorthListProps) => {
  const assets = items.filter((item) => item.type === "ASSET");
  const liabilities = items.filter((item) => item.type === "LIABILITY");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Assets & Liabilities</h2>
      <p className="mt-1 text-sm text-slate-400">
        Track what you own and what you owe
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-emerald-400">
            Assets
          </h3>

          <div className="space-y-3">
            {assets.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-900/80 p-4">
                <div className="flex justify-between gap-4">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                  <span className="font-semibold text-emerald-400">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>
            ))}

            {assets.length === 0 && (
              <p className="text-sm text-slate-500">No assets added yet.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-red-400">
            Liabilities
          </h3>

          <div className="space-y-3">
            {liabilities.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-900/80 p-4">
                <div className="flex justify-between gap-4">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                  <span className="font-semibold text-red-400">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>
            ))}

            {liabilities.length === 0 && (
              <p className="text-sm text-slate-500">
                No liabilities added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetWorthList;