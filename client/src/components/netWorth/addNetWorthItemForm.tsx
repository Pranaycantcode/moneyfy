"use client";

import { useState } from "react";
import {
  CreateNetWorthItemInput,
  NetWorthItemType,
} from "@/types/netWorth";

interface AddNetWorthItemFormProps {
  onAddItem: (item: CreateNetWorthItemInput) => Promise<void>;
}

const AddNetWorthItemForm = ({ onAddItem }: AddNetWorthItemFormProps) => {
  const [formData, setFormData] = useState<CreateNetWorthItemInput>({
    name: "",
    amount: 0,
    type: "ASSET",
    category: "",
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    field: keyof CreateNetWorthItemInput,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "amount" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (value: NetWorthItemType) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.amount || !formData.category) {
      return;
    }

    setSubmitting(true);

    try {
      await onAddItem(formData);

      setFormData({
        name: "",
        amount: 0,
        type: "ASSET",
        category: "",
        note: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Add Asset or Liability</h2>
      <p className="mt-1 text-sm text-slate-400">
        Add bank balance, investments, debts, or loans
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Name"
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
          onChange={(e) => handleTypeChange(e.target.value as NetWorthItemType)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        >
          <option value="ASSET">Asset</option>
          <option value="LIABILITY">Liability</option>
        </select>

        <input
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="Category"
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
          className="rounded-xl bg-purple-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60 md:col-span-2"
        >
          {submitting ? "Adding..." : "Add Item"}
        </button>
      </form>
    </section>
  );
};

export default AddNetWorthItemForm;