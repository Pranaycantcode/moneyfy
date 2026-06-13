import {
  CreateRecurringTransactionInput,
  RecurringTransaction,
} from "@/types/recurringTransaction";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("moneyfy_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getRecurringTransactions = async (): Promise<
  RecurringTransaction[]
> => {
  const response = await fetch(`${API_URL}/recurring-transactions`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recurring transactions");
  }

  return response.json();
};

export const createRecurringTransaction = async (
  recurringData: CreateRecurringTransactionInput,
): Promise<RecurringTransaction> => {
  const response = await fetch(`${API_URL}/recurring-transactions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(recurringData),
  });

  if (!response.ok) {
    throw new Error("Failed to create recurring transaction");
  }

  return response.json();
};

export const toggleRecurringTransaction = async (
  id: string,
): Promise<RecurringTransaction> => {
  const response = await fetch(
    `${API_URL}/recurring-transactions/${id}/toggle`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to toggle recurring transaction");
  }

  return response.json();
};