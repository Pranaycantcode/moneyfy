"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import AddBudgetForm from "@/components/budgets/addBudgetForm";
import BudgetProgressList from "@/components/budgets/budgetProgressList";
import { createBudget, getBudgetSummary } from "@/services/budgetService";
import { BudgetSummary, CreateBudgetInput } from "@/types/budget";

export default function BudgetsPage() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [budgets, setBudgets] = useState<BudgetSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBudgets = async () => {
    try {
      setLoading(true);
      const data = await getBudgetSummary(currentMonth, currentYear);
      setBudgets(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBudget = async (budgetData: CreateBudgetInput) => {
    await createBudget(budgetData);
    await loadBudgets();
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Budgets</h2>
          <p className="mt-1 text-sm text-slate-400">
            Set category-wise monthly limits and compare them against actual spending.
          </p>
        </div>

        <AddBudgetForm onAddBudget={handleAddBudget} />

        {loading ? (
          <p className="text-slate-400">Loading budgets...</p>
        ) : (
          <BudgetProgressList budgets={budgets} />
        )}
      </div>
    </DashboardLayout>
  );
}