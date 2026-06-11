import {
  CreateNetWorthItemInput,
  NetWorthItem,
  NetWorthSummary,
} from "@/types/netWorth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("moneyfy_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getNetWorthItems = async (): Promise<NetWorthItem[]> => {
  const response = await fetch(`${API_URL}/net-worth`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch net worth items");
  }

  return response.json();
};

export const getNetWorthSummary =
  async (): Promise<NetWorthSummary> => {
    const response = await fetch(`${API_URL}/net-worth/summary`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch net worth summary");
    }

    return response.json();
  };

export const createNetWorthItem = async (
  itemData: CreateNetWorthItemInput,
): Promise<NetWorthItem> => {
  const response = await fetch(`${API_URL}/net-worth`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error("Failed to create net worth item");
  }

  return response.json();
};