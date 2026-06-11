export type NetWorthItemType = "ASSET" | "LIABILITY";

export interface NetWorthItem {
  id: string;
  name: string;
  amount: number;
  type: NetWorthItemType;
  category: string;
  note?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NetWorthSummary {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  itemCount: number;
}

export interface CreateNetWorthItemInput {
  name: string;
  amount: number;
  type: NetWorthItemType;
  category: string;
  note?: string;
}