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
import NetWorthSummary from "@/components/netWorth/netWorthSummary";
import NetWorthList from "@/components/netWorth/netWorthList";
import AddNetWorthItemForm from "@/components/netWorth/addNetWorthItemForm";
import { createNetWorthItem } from "@/services/netWorthService";
import { CreateNetWorthItemInput } from "@/types/netWorth";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/services/authService";
import AddRecurringTransactionForm from "@/components/recurringTransactions/addRecurringTransactionForm";
import RecurringTransactionsList from "@/components/recurringTransactions/recurringTransactionsList";
import TransactionImportForm from "@/components/transactions/transactionImportForm";
import { importTransactionsFromCsv } from "@/services/transactionService";
import AddBudgetForm from "@/components/budgets/addBudgetForm";
import BudgetProgressList from "@/components/budgets/budgetProgressList";
import DashboardAccountOverview from "@/components/accounts/dashboardAccountOverview";
import { getAccountSummary, getAccounts } from "@/services/accountService";
import { Account, AccountSummary } from "@/types/account";
import Link from "next/link";

import { createBudget, getBudgetSummary } from "@/services/budgetService";

import { BudgetSummary, CreateBudgetInput } from "@/types/budget";
import {
  createRecurringTransaction,
  getRecurringTransactions,
  toggleRecurringTransaction,
} from "@/services/recurringTransactionService";
import {
  CreateRecurringTransactionInput,
  RecurringTransaction,
} from "@/types/recurringTransaction";
import {
  getNetWorthItems,
  getNetWorthSummary,
} from "@/services/netWorthService";
import {
  NetWorthItem,
  NetWorthSummary as NetWorthSummaryType,
} from "@/types/netWorth";
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
  const [netWorthSummary, setNetWorthSummary] =
    useState<NetWorthSummaryType | null>(null);

  const router = useRouter();

  const [recurringTransactions, setRecurringTransactions] = useState<
    RecurringTransaction[]
  >([]);

  const [netWorthItems, setNetWorthItems] = useState<NetWorthItem[]>([]);
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountSummary, setAccountSummary] = useState<AccountSummary | null>(
    null,
  );

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [
        summaryData,
        recentData,
        monthlyData,
        categoryData,
        goalsData,
        netWorthSummaryData,
        netWorthItemsData,
        recurringTransactionsData,
        budgetSummaryData,
        accountsData,
        accountSummaryData,
      ] = await Promise.all([
        getTransactionSummary(),
        getRecentTransactions(),
        getMonthlyAnalytics(),
        getCategoryBreakdown(),
        getGoalProgress(),
        getNetWorthSummary(),
        getNetWorthItems(),
        getRecurringTransactions(),
        getBudgetSummary(currentMonth, currentYear),
        getAccounts(),
        getAccountSummary(),
      ]);

      setSummary(summaryData);
      setTransactions(recentData);
      setMonthlyAnalytics(monthlyData);
      setCategoryBreakdown(categoryData);
      setGoals(goalsData);
      setNetWorthSummary(netWorthSummaryData);
      setNetWorthItems(netWorthItemsData);
      setRecurringTransactions(recurringTransactionsData);
      setBudgetSummary(budgetSummaryData);
      setAccounts(accountsData);
      setAccountSummary(accountSummaryData);
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

  const handleImportTransactions = async (file: File) => {
    await importTransactionsFromCsv(file);
    await loadDashboardData();
  };

  const handleAddGoal = async (goalData: CreateGoalInput) => {
    await createGoal(goalData);
    await loadDashboardData();
  };

  const handleAddNetWorthItem = async (itemData: CreateNetWorthItemInput) => {
    await createNetWorthItem(itemData);
    await loadDashboardData();
  };

  const handleAddRecurringTransaction = async (
    recurringData: CreateRecurringTransactionInput,
  ) => {
    await createRecurringTransaction(recurringData);
    await loadDashboardData();
  };

  const handleToggleRecurringTransaction = async (id: string) => {
    await toggleRecurringTransaction(id);
    await loadDashboardData();
  };

  const handleAddBudget = async (budgetData: CreateBudgetInput) => {
    await createBudget(budgetData);

    await loadDashboardData();
  };

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      router.push("/auth");
      return;
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-slate-400">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  if (error || !summary || !netWorthSummary || !accountSummary) {
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

        <NetWorthSummary summary={netWorthSummary} />

        <DashboardAccountOverview
          accounts={accounts}
          summary={accountSummary}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Link
            href="/transactions"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="font-semibold">Transactions</h3>
            <p className="mt-1 text-sm text-slate-400">
              Manage financial activity
            </p>
          </Link>

          <Link
            href="/goals"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="font-semibold">Goals</h3>
            <p className="mt-1 text-sm text-slate-400">Track savings goals</p>
          </Link>

          <Link
            href="/budgets"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="font-semibold">Budgets</h3>
            <p className="mt-1 text-sm text-slate-400">
              Monitor spending limits
            </p>
          </Link>

          <Link
            href="/net-worth"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="font-semibold">Net Worth</h3>
            <p className="mt-1 text-sm text-slate-400">
              Assets and liabilities
            </p>
          </Link>
        </div>

        {/* <AddTransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionImportForm
          onImportTransactions={handleImportTransactions}
        />
        <AddGoalForm onAddGoal={handleAddGoal} />

        <AddNetWorthItemForm onAddItem={handleAddNetWorthItem} /> */}

        {/* <AddRecurringTransactionForm
          onAddRecurringTransaction={handleAddRecurringTransaction}
        />

        <AddBudgetForm onAddBudget={handleAddBudget} /> */}

        <NetWorthList items={netWorthItems} />

        <BudgetProgressList budgets={budgetSummary} />

        <RecurringTransactionsList
          recurringTransactions={recurringTransactions}
          onToggleRecurringTransaction={handleToggleRecurringTransaction}
        />

        {/* <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentTransactions transactions={transactions} />
          </div>
 */}
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
        {/*  </div> */}

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
