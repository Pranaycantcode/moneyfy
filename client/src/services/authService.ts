import { AuthResponse, LoginInput, RegisterInput } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (loginData: LoginInput): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
};

export const register = async (
  registerData: RegisterInput,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const saveAuthToken = (token: string) => {
  localStorage.setItem("moneyfy_token", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("moneyfy_token");
};

export const clearAuthToken = () => {
  localStorage.removeItem("moneyfy_token");
};