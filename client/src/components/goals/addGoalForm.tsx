"use client";

import { useState } from "react";
import { CreateGoalInput } from "@/types/goal";

interface AddGoalFormProps {
  onAddGoal: (goal: CreateGoalInput) => Promise<void>;
}

const AddGoalForm = ({ onAddGoal }: AddGoalFormProps) => {
  const [formData, setFormData] = useState<CreateGoalInput>({
    title: "",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: new Date().toISOString().split("T")[0],
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof CreateGoalInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === "targetAmount" || field === "currentAmount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.title || !formData.targetAmount || !formData.targetDate) {
      return;
    }

    setSubmitting(true);

    try {
      await onAddGoal(formData);

      setFormData({
        title: "",
        targetAmount: 0,
        currentAmount: 0,
        targetDate: new Date().toISOString().split("T")[0],
        note: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Add Savings Goal</h2>
      <p className="mt-1 text-sm text-slate-400">
        Create a goal and track progress over time
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Goal title"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="number"
          value={formData.targetAmount || ""}
          onChange={(e) => handleChange("targetAmount", e.target.value)}
          placeholder="Target amount"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="number"
          value={formData.currentAmount || ""}
          onChange={(e) => handleChange("currentAmount", e.target.value)}
          placeholder="Current amount"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="date"
          value={formData.targetDate}
          onChange={(e) => handleChange("targetDate", e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          value={formData.note || ""}
          onChange={(e) => handleChange("note", e.target.value)}
          placeholder="Note optional"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none md:col-span-2"
        />

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-blue-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60 md:col-span-2"
        >
          {submitting ? "Adding..." : "Add Goal"}
        </button>
      </form>
    </section>
  );
};

export default AddGoalForm;