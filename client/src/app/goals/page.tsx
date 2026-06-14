"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import AddGoalForm from "@/components/goals/addGoalForm";
import GoalProgressList from "@/components/goals/goalProgressList";
import { createGoal, getGoalProgress } from "@/services/goalService";
import { CreateGoalInput, GoalProgress } from "@/types/goal";

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await getGoalProgress();
      setGoals(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goalData: CreateGoalInput) => {
    await createGoal(goalData);
    await loadGoals();
  };

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Savings Goals</h2>
          <p className="mt-1 text-sm text-slate-400">
            Create and track progress toward your financial goals.
          </p>
        </div>

        <AddGoalForm onAddGoal={handleAddGoal} />

        {loading ? (
          <p className="text-slate-400">Loading goals...</p>
        ) : (
          <GoalProgressList goals={goals} />
        )}
      </div>
    </DashboardLayout>
  );
}