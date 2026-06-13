import { Budget, BudgetSummary, CreateBudgetInput } from "@/types/budget";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("moneyfy_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createBudget = async (
  budgetData: CreateBudgetInput,
): Promise<Budget> => {
  const response = await fetch(`${API_URL}/budgets`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(budgetData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create budget");
  }

  return response.json();
};

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await fetch(`${API_URL}/budgets`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch budgets");
  }

  return response.json();
};

export const getBudgetSummary = async (
  month: number,
  year: number,
): Promise<BudgetSummary[]> => {
  const response = await fetch(
    `${API_URL}/budgets/summary?month=${month}&year=${year}`,
    {
      headers: getAuthHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch budget summary");
  }

  return response.json();
};
