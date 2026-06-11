"use client";

import { useEffect, useState } from "react";
import AnalyticsGrid from "@/components/dashboard/analyticsGrid";
import DashboardLayout from "@/components/layout/dashboardLayout";
import RecentTransactions from "@/components/transactions/recentTransactions";
import GoalProgressList from "@/components/goals/goalProgressList";
import { getGoalProgress } from "@/services/goalService";
import { GoalProgress } from "@/types/goal";
import AddTransactionForm from "@/components/transactions/addTransactionForm";
import { CreateTransactionInput } from "@/types/transaction";
import { createTransaction } from "@/services/transactionService";
import AddGoalForm from "@/components/goals/addGoalForm";
import { CreateGoalInput } from "@/types/goal";
import { createGoal } from "@/services/goalService";
import MonthlyCashflowChart from "@/components/dashboard/monthlyCashflowChart";
import CategoryBreakdownChart from "@/components/dashboard/categoryBreakdownChart";
import {
  CategoryBreakdown,
  MonthlyAnalytics,
  TransactionSummary,
} from "@/types/analytics";
import { Transaction } from "@/types/transaction";
import {
  getCategoryBreakdown,
  getMonthlyAnalytics,
  getRecentTransactions,
  getTransactionSummary,
} from "@/services/transactionService";

export default function Home() {
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState<MonthlyAnalytics[]>(
    [],
  );
  const [categoryBreakdown, setCategoryBreakdown] = useState<
    CategoryBreakdown[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [goals, setGoals] = useState<GoalProgress[]>([]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [summaryData, recentData, monthlyData, categoryData, goalsData] =
        await Promise.all([
          getTransactionSummary(),
          getRecentTransactions(),
          getMonthlyAnalytics(),
          getCategoryBreakdown(),
          getGoalProgress(),
        ]);

      setSummary(summaryData);
      setTransactions(recentData);
      setMonthlyAnalytics(monthlyData);
      setCategoryBreakdown(categoryData);
      setGoals(goalsData);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard data. Please check your login token.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (
    transactionData: CreateTransactionInput,
  ) => {
    await createTransaction(transactionData);
    await loadDashboardData();
  };

  const handleAddGoal = async (goalData: CreateGoalInput) => {
    await createGoal(goalData);
    await loadDashboardData();
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-slate-400">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  if (error || !summary) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
          {error || "Something went wrong."}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AnalyticsGrid summary={summary} />

        <AddTransactionForm onAddTransaction={handleAddTransaction} />
        <AddGoalForm onAddGoal={handleAddGoal} />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentTransactions transactions={transactions} />
          </div>

          {/* <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Category Breakdown</h2>
            <div className="mt-5 space-y-3">
              {categoryBreakdown.map((item) => (
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
          </section> */}
        </div>

        {/* <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Monthly Cashflow</h2>
          <div className="mt-5 space-y-3">
            {monthlyAnalytics.map((item) => (
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
        </section> */}
        <GoalProgressList goals={goals} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <MonthlyCashflowChart data={monthlyAnalytics} />
        <CategoryBreakdownChart data={categoryBreakdown} />
      </div>
    </DashboardLayout>
  );
}
