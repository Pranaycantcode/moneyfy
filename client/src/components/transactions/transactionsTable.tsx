"use client";

import { useMemo, useState } from "react";
import { CreateTransactionInput, Transaction } from "@/types/transaction";
import { Account } from "@/types/account";

interface TransactionsTableProps {
  transactions: Transaction[];
  accounts: Account[];
  onDeleteTransaction: (id: string) => Promise<void>;
  onUpdateTransaction: (
    id: string,
    data: Partial<CreateTransactionInput>,
  ) => Promise<void>;
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

const TransactionsTable = ({
  transactions,
  accounts,
  onDeleteTransaction,
  onUpdateTransaction,
}: TransactionsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [accountFilter, setAccountFilter] = useState("ALL");

  const [editData, setEditData] = useState<Partial<CreateTransactionInput>>({});

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

      const matchesAccount =
        accountFilter === "ALL" ||
        (accountFilter === "NO_ACCOUNT" && !transaction.accountId) ||
        transaction.accountId === accountFilter;

      return matchesSearch && matchesType && matchesCategory && matchesAccount;
    });
  }, [transactions, searchTerm, typeFilter, categoryFilter, accountFilter]);

  const startEditing = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date.split("T")[0],
      note: transaction.note || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEditing = async (id: string) => {
    await onUpdateTransaction(id, editData);
    setEditingId(null);
    setEditData({});
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">All Transactions</h2>
        <p className="text-sm text-slate-400">
          Search, filter, and review all financial activity
        </p>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-4">
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

      <select
        value={accountFilter}
        onChange={(event) => setAccountFilter(event.target.value)}
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm outline-none"
      >
        <option value="ALL">All Accounts</option>
        <option value="NO_ACCOUNT">No Account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t border-white/10 bg-slate-950/40"
              >
                <td className="px-4 py-3">
                  {editingId === transaction.id ? (
                    <input
                      value={editData.title || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg bg-slate-900 p-2 text-sm"
                    />
                  ) : (
                    transaction.title
                  )}
                </td>

                <td className="px-4 py-3 text-slate-400">
                  {editingId === transaction.id ? (
                    <input
                      value={editData.category || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg bg-slate-900 p-2 text-sm"
                    />
                  ) : (
                    transaction.category
                  )}
                </td>

                <td className="px-4 py-3 text-slate-400">
                  {transaction.account
                    ? transaction.account.name
                    : "No account"}
                </td>

                <td className="px-4 py-3">
                  {editingId === transaction.id ? (
                    <select
                      value={editData.type || transaction.type}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          type: e.target.value as Transaction["type"],
                        }))
                      }
                      className="rounded-lg bg-slate-900 p-2 text-sm"
                    >
                      <option value="INCOME">INCOME</option>
                      <option value="EXPENSE">EXPENSE</option>
                    </select>
                  ) : (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                      {transaction.type}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-slate-400">
                  {editingId === transaction.id ? (
                    <input
                      type="date"
                      value={
                        typeof editData.date === "string"
                          ? editData.date
                          : transaction.date.split("T")[0]
                      }
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="rounded-lg bg-slate-900 p-2 text-sm"
                    />
                  ) : (
                    formatDate(transaction.date)
                  )}
                </td>

                <td
                  className={
                    transaction.type === "INCOME"
                      ? "px-4 py-3 text-right font-semibold text-emerald-400"
                      : "px-4 py-3 text-right font-semibold text-red-400"
                  }
                >
                  {editingId === transaction.id ? (
                    <input
                      type="number"
                      value={editData.amount || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          amount: Number(e.target.value),
                        }))
                      }
                      className="w-28 rounded-lg bg-slate-900 p-2 text-right text-sm"
                    />
                  ) : (
                    <>
                      {transaction.type === "INCOME" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </>
                  )}
                </td>

                <td className="px-4 py-3 text-center">
                  {editingId === transaction.id ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => saveEditing(transaction.id)}
                        className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-medium text-white"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEditing}
                        className="rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => startEditing(transaction)}
                        className="rounded-lg bg-blue-500 px-3 py-1 text-xs font-medium text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredTransactions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
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
