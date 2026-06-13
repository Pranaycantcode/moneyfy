"use client";

import { useState } from "react";
import {
  CreateRecurringTransactionInput,
  RecurringFrequency,
} from "@/types/recurringTransaction";
import { TransactionType } from "@/types/transaction";

interface AddRecurringTransactionFormProps {
  onAddRecurringTransaction: (
    recurringTransaction: CreateRecurringTransactionInput,
  ) => Promise<void>;
}

const AddRecurringTransactionForm = ({
  onAddRecurringTransaction,
}: AddRecurringTransactionFormProps) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<CreateRecurringTransactionInput>({
    title: "",
    amount: 0,
    type: "EXPENSE",
    category: "",
    frequency: "MONTHLY",
    startDate: today,
    nextRunDate: today,
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    field: keyof CreateRecurringTransactionInput,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.title || !formData.amount || !formData.category) {
      return;
    }

    setSubmitting(true);

    try {
      await onAddRecurringTransaction(formData);

      setFormData({
        title: "",
        amount: 0,
        type: "EXPENSE",
        category: "",
        frequency: "MONTHLY",
        startDate: today,
        nextRunDate: today,
        note: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Add Recurring Transaction</h2>
      <p className="mt-1 text-sm text-slate-400">
        Automate repeated income, subscriptions, SIPs, rent, and bills
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Title"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="number"
          value={formData.amount || ""}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Amount"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <select
          value={formData.type}
          onChange={(e) =>
            handleChange("type", e.target.value as TransactionType)
          }
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <input
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="Category"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <select
          value={formData.frequency}
          onChange={(e) =>
            handleChange("frequency", e.target.value as RecurringFrequency)
          }
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        >
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>

        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          type="date"
          value={formData.nextRunDate}
          onChange={(e) => handleChange("nextRunDate", e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <input
          value={formData.note || ""}
          onChange={(e) => handleChange("note", e.target.value)}
          placeholder="Note optional"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60 md:col-span-2"
        >
          {submitting ? "Adding..." : "Add Recurring Transaction"}
        </button>
      </form>
    </section>
  );
};

export default AddRecurringTransactionForm;