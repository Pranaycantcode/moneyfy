import { Transaction } from "@/types/transaction";
import {
  CategoryBreakdown,
  MonthlyAnalytics,
  TransactionSummary,
} from "@/types/analytics";

export const mockSummary: TransactionSummary = {
  totalIncome: 12000,
  totalExpenses: 2500,
  balance: 9500,
  transactionCount: 5,
  savingsRate: 79.17,
};

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Monthly stipend",
    amount: 12000,
    type: "INCOME",
    category: "Salary",
    date: "2026-06-11",
    note: "June stipend",
  },
  {
    id: "2",
    title: "Food",
    amount: 250,
    type: "EXPENSE",
    category: "Food",
    date: "2026-06-11",
  },
  {
    id: "3",
    title: "Metro recharge",
    amount: 500,
    type: "EXPENSE",
    category: "Transport",
    date: "2026-06-10",
  },
];

export const mockMonthlyAnalytics: MonthlyAnalytics[] = [
  {
    month: "Jun 2026",
    income: 12000,
    expenses: 2500,
    balance: 9500,
  },
];

export const mockCategoryBreakdown: CategoryBreakdown[] = [
  {
    category: "Food",
    amount: 1200,
  },
  {
    category: "Transport",
    amount: 500,
  },
  {
    category: "Subscriptions",
    amount: 800,
  },
];