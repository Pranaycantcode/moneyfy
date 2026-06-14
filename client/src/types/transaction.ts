export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  note?: string;
  accountId?: string | null;
}

export interface CreateTransactionInput {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  note?: string;
  accountId?: string;
}