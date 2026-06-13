export interface Budget {
  id: string;
  category: string;
  limit: number;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetSummary {
  id: string;
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  usedPercentage: number;
  month: number;
  year: number;
  status: "ON_TRACK" | "WARNING" | "OVER_BUDGET";
}

export interface CreateBudgetInput {
  category: string;
  limit: number;
  month: number;
  year: number;
}