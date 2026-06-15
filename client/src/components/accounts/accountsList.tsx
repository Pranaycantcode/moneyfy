"use client";

import { useState } from "react";

import { Account } from "@/types/account";

interface AccountsListProps {
  accounts: Account[];
  onUpdateAccount: (id: string, data: Partial<Account>) => Promise<void>;
  onDeleteAccount: (id: string) => Promise<void>;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const AccountsList = ({
  accounts,
  onUpdateAccount,
  onDeleteAccount,
}: AccountsListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Account>>({});

  const startEditing = (account: Account) => {
    setEditingId(account.id);
    setEditData({
      name: account.name,
      type: account.type,
      balance: account.balance,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEditing = async (id: string) => {
    await onUpdateAccount(id, editData);
    setEditingId(null);
    setEditData({});
  };
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Accounts</h2>
      <p className="mt-1 text-sm text-slate-400">
        View all your financial accounts
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <div key={account.id} className="rounded-xl bg-slate-900/80 p-4">
            <div className="flex justify-between gap-4">
              <div className="space-y-2">
                {editingId === account.id ? (
                  <>
                    <input
                      value={editData.name || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="rounded-lg bg-slate-800 p-2 text-sm"
                    />

                    <select
                      value={editData.type || account.type}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="rounded-lg bg-slate-800 p-2 text-sm"
                    >
                      <option value="BANK">Bank</option>
                      <option value="CASH">Cash</option>
                      <option value="INVESTMENT">Investment</option>
                      <option value="CREDIT">Credit</option>
                      <option value="LOAN">Loan</option>
                    </select>
                  </>
                ) : (
                  <>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-slate-400">{account.type}</p>
                  </>
                )}
              </div>

              <div className="text-right">
                {editingId === account.id ? (
                  <input
                    type="number"
                    value={editData.balance ?? ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        balance: Number(e.target.value),
                      }))
                    }
                    className="w-28 rounded-lg bg-slate-800 p-2 text-right text-sm"
                  />
                ) : (
                  <span className="font-semibold">
                    {formatCurrency(account.balance)}
                  </span>
                )}

                <div className="mt-3 flex justify-end gap-2">
                  {editingId === account.id ? (
                    <>
                      <button
                        onClick={() => saveEditing(account.id)}
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
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(account)}
                        className="rounded-lg bg-blue-500 px-3 py-1 text-xs font-medium text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDeleteAccount(account.id)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <p className="text-sm text-slate-500">No accounts added yet.</p>
        )}
      </div>
    </section>
  );
};

export default AccountsList;
