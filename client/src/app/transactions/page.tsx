"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import RecentTransactions from "@/components/transactions/recentTransactions";
import AddTransactionForm from "@/components/transactions/addTransactionForm";
import TransactionImportForm from "@/components/transactions/transactionImportForm";
import {
  createTransaction,
  getAllTransactions,
  importTransactionsFromCsv,
} from "@/services/transactionService";
import {
  CreateTransactionInput,
  Transaction,
} from "@/types/transaction";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await getAllTransactions();
      setTransactions(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (
    transactionData: CreateTransactionInput,
  ) => {
    await createTransaction(transactionData);
    await loadTransactions();
  };

  const handleImportTransactions = async (file: File) => {
    await importTransactionsFromCsv(file);
    await loadTransactions();
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="mt-1 text-sm text-slate-400">
            Add, import, and review your financial activity.
          </p>
        </div>

        <AddTransactionForm onAddTransaction={handleAddTransaction} />

        <TransactionImportForm
          onImportTransactions={handleImportTransactions}
        />

        {loading ? (
          <p className="text-slate-400">Loading transactions...</p>
        ) : (
          <RecentTransactions transactions={transactions} />
        )}
      </div>
    </DashboardLayout>
  );
}