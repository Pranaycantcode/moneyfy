import { GoalProgress } from "@/types/goal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("moneyfy_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getGoalProgress = async (): Promise<GoalProgress[]> => {
  const response = await fetch(`${API_URL}/goals/progress`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch goal progress");
  }

  return response.json();
};