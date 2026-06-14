import {
  Account,
  AccountSummary,
  CreateAccountInput,
} from "@/types/account";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("moneyfy_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${API_URL}/accounts`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return response.json();
};

export const getAccountSummary = async (): Promise<AccountSummary> => {
  const response = await fetch(`${API_URL}/accounts/summary`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch account summary");
  }

  return response.json();
};

export const createAccount = async (
  accountData: CreateAccountInput,
): Promise<Account> => {
  const response = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(accountData),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }

  return response.json();
};