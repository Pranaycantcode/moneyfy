import {
  CategoryBreakdown,
  MonthlyAnalytics,
  TransactionSummary,
} from "@/types/analytics";
import { Transaction } from "@/types/transaction";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("moneyfy_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getTransactionSummary = async (): Promise<TransactionSummary> => {
  const response = await fetch(`${API_URL}/transactions/summary`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transaction summary");
  }

  return response.json();
};

export const getRecentTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch(`${API_URL}/transactions/recent`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recent transactions");
  }

  return response.json();
};

export const getMonthlyAnalytics = async (): Promise<MonthlyAnalytics[]> => {
  const response = await fetch(`${API_URL}/transactions/monthly`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch monthly analytics");
  }

  return response.json();
};

export const getCategoryBreakdown = async (): Promise<CategoryBreakdown[]> => {
  const response = await fetch(`${API_URL}/transactions/category-breakdown`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch category breakdown");
  }

  return response.json();
};