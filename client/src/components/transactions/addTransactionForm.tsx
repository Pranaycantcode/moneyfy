"use client";

import { useState } from "react";
import { CreateTransactionInput, TransactionType } from "@/types/transaction";
import { Account } from "@/types/account";

interface AddTransactionFormProps {
  onAddTransaction: (transaction: CreateTransactionInput) => Promise<void>;
  accounts?: Account[];
}

const AddTransactionForm = ({
  onAddTransaction,
  accounts = [],
}: AddTransactionFormProps) => {
  const [formData, setFormData] = useState<CreateTransactionInput>({
    title: "",
    amount: 0,
    type: "EXPENSE",
    category: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
    accountId: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof CreateTransactionInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "amount" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (value: TransactionType) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      return;
    }

    setSubmitting(true);

    try {
      const payload: CreateTransactionInput = {
        ...formData,
        accountId: formData.accountId || undefined,
      };

      await onAddTransaction(payload);
      setFormData({
        title: "",
        amount: 0,
        type: "EXPENSE",
        category: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
        accountId: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Add Transaction</h2>
      <p className="mt-1 text-sm text-slate-400">
        Record income or expenses directly from your dashboard
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <select
          value={formData.accountId || ""}
          onChange={(e) => handleChange("accountId", e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        >
          <option value="">No account selected</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} ({account.type})
            </option>
          ))}
        </select>
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
          onChange={(e) => handleTypeChange(e.target.value as TransactionType)}
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

        <input
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
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
          className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60 md:col-span-2"
        >
          {submitting ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </section>
  );
};

export default AddTransactionForm;
