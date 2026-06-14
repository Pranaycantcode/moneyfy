"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import NetWorthSummary from "@/components/netWorth/netWorthSummary";
import NetWorthList from "@/components/netWorth/netWorthList";
import AddNetWorthItemForm from "@/components/netWorth/addNetWorthItemForm";
import {
  createNetWorthItem,
  getNetWorthItems,
  getNetWorthSummary,
} from "@/services/netWorthService";
import {
  CreateNetWorthItemInput,
  NetWorthItem,
  NetWorthSummary as NetWorthSummaryType,
} from "@/types/netWorth";

export default function NetWorthPage() {
  const [netWorthSummary, setNetWorthSummary] =
    useState<NetWorthSummaryType | null>(null);

  const [netWorthItems, setNetWorthItems] = useState<NetWorthItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNetWorthData = async () => {
    try {
      setLoading(true);

      const [summaryData, itemsData] = await Promise.all([
        getNetWorthSummary(),
        getNetWorthItems(),
      ]);

      setNetWorthSummary(summaryData);
      setNetWorthItems(itemsData);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNetWorthItem = async (
    itemData: CreateNetWorthItemInput,
  ) => {
    await createNetWorthItem(itemData);
    await loadNetWorthData();
  };

  useEffect(() => {
    loadNetWorthData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Net Worth</h2>
          <p className="mt-1 text-sm text-slate-400">
            Track your assets, liabilities, and overall financial position.
          </p>
        </div>

        {loading || !netWorthSummary ? (
          <p className="text-slate-400">Loading net worth data...</p>
        ) : (
          <>
            <NetWorthSummary summary={netWorthSummary} />

            <AddNetWorthItemForm onAddItem={handleAddNetWorthItem} />

            <NetWorthList items={netWorthItems} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}