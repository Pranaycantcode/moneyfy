"use client";

import { useState } from "react";
import { CreateAccountInput } from "@/types/account";

interface AddAccountFormProps {
  onAddAccount: (account: CreateAccountInput) => Promise<void>;
}

const AddAccountForm = ({ onAddAccount }: AddAccountFormProps) => {
  const [formData, setFormData] = useState<CreateAccountInput>({
    name: "",
    type: "BANK",
    balance: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof CreateAccountInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "balance" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.type) {
      return;
    }

    setSubmitting(true);

    try {
      await onAddAccount(formData);

      setFormData({
        name: "",
        type: "BANK",
        balance: 0,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Add Account</h2>
      <p className="mt-1 text-sm text-slate-400">
        Add bank accounts, cash wallets, investment accounts, or credit accounts
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-3">
        <input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Account name"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <select
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        >
          <option value="BANK">Bank</option>
          <option value="CASH">Cash</option>
          <option value="INVESTMENT">Investment</option>
          <option value="CREDIT">Credit</option>
          <option value="LOAN">Loan</option>
        </select>

        <input
          type="number"
          value={formData.balance || ""}
          onChange={(e) => handleChange("balance", e.target.value)}
          placeholder="Opening balance"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-indigo-300 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60 md:col-span-3"
        >
          {submitting ? "Adding..." : "Add Account"}
        </button>
      </form>
    </section>
  );
};

export default AddAccountForm;