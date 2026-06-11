import AnalyticsGrid from "@/components/dashboard/analyticsGrid";
import DashboardLayout from "@/components/layout/dashboardLayout";
import RecentTransactions from "@/components/transactions/recentTransactions";
import {
  mockCategoryBreakdown,
  mockMonthlyAnalytics,
  mockSummary,
  mockTransactions,
} from "@/data/mockData";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AnalyticsGrid summary={mockSummary} />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentTransactions transactions={mockTransactions} />
          </div>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Category Breakdown</h2>
            <div className="mt-5 space-y-3">
              {mockCategoryBreakdown.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-400">{item.category}</span>
                  <span className="font-medium">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Monthly Cashflow</h2>
          <div className="mt-5 space-y-3">
            {mockMonthlyAnalytics.map((item) => (
              <div
                key={item.month}
                className="grid gap-3 rounded-xl bg-slate-900/80 p-4 md:grid-cols-4"
              >
                <span>{item.month}</span>
                <span>Income: ₹{item.income.toLocaleString("en-IN")}</span>
                <span>Expenses: ₹{item.expenses.toLocaleString("en-IN")}</span>
                <span>Balance: ₹{item.balance.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}