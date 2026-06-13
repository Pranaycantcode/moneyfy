"use client";

import { useState } from "react";
import { CreateBudgetInput } from "@/types/budget";

interface AddBudgetFormProps {
  onAddBudget: (budget: CreateBudgetInput) => Promise<void>;
}

const AddBudgetForm = ({ onAddBudget }: AddBudgetFormProps) => {
  const currentDate = new Date();

  const [formData, setFormData] = useState<CreateBudgetInput>({
    category: "",
    limit: 0,
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof CreateBudgetInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "category" ? value : Number(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.category || !formData.limit || !formData.month || !formData.year) {
      return;
    }

    setSubmitting(true);

    try {
      await onAddBudget(formData);

      setFormData({
        category: "",
        limit: 0,
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Add Budget</h2>
      <p className="mt-1 text-sm text-slate-400">
        Set monthly spending limits by category
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="Category e.g. Food"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="number"
          value={formData.limit || ""}
          onChange={(e) => handleChange("limit", e.target.value)}
          placeholder="Budget limit"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="number"
          value={formData.month}
          onChange={(e) => handleChange("month", e.target.value)}
          min={1}
          max={12}
          placeholder="Month"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="number"
          value={formData.year}
          onChange={(e) => handleChange("year", e.target.value)}
          placeholder="Year"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-orange-300 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60 md:col-span-2"
        >
          {submitting ? "Adding..." : "Add Budget"}
        </button>
      </form>
    </section>
  );
};

export default AddBudgetForm;