export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
  savingsRate: number;
}

export interface MonthlyAnalytics {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
}