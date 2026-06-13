"use client";

import { useMemo, useState } from "react";
import { Transaction } from "@/types/transaction";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const categories = useMemo(() => {
    return Array.from(
      new Set(transactions.map((transaction) => transaction.category)),
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "ALL" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "ALL" || transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, typeFilter, categoryFilter]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">All Transactions</h2>
        <p className="text-sm text-slate-400">
          Search, filter, and review all financial activity
        </p>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by title or category"
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        />

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        >
          <option value="ALL">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
        >
          <option value="ALL">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t border-white/10 bg-slate-950/40"
              >
                <td className="px-4 py-3">{transaction.title}</td>
                <td className="px-4 py-3 text-slate-400">
                  {transaction.category}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {transaction.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400">
                  {formatDate(transaction.date)}
                </td>
                <td
                  className={
                    transaction.type === "INCOME"
                      ? "px-4 py-3 text-right font-semibold text-emerald-400"
                      : "px-4 py-3 text-right font-semibold text-red-400"
                  }
                >
                  {transaction.type === "INCOME" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))}

            {filteredTransactions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsTable;