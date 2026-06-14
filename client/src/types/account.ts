export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccountSummary {
  totalBalance: number;
  accountCount: number;
}

export interface CreateAccountInput {
  name: string;
  type: string;
  balance: number;
}