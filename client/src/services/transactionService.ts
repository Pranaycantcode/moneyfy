import {
  CategoryBreakdown,
  MonthlyAnalytics,
  TransactionSummary,
} from "@/types/analytics";
import { Transaction } from "@/types/transaction";
import { CreateTransactionInput } from "@/types/transaction";

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

export const createTransaction = async (
  transactionData: CreateTransactionInput
): Promise<Transaction> => {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return response.json();
};

export const importTransactionsFromCsv = async (
  file: File,
): Promise<{ importedCount: number }> => {
  const token = localStorage.getItem("moneyfy_token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/transactions/import`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to import transactions");
  }

  return response.json();
};