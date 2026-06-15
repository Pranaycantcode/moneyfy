"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import TransactionsTable from "@/components/transactions/transactionsTable";
import AddTransactionForm from "@/components/transactions/addTransactionForm";
import TransactionImportForm from "@/components/transactions/transactionImportForm";
import { getAccounts } from "@/services/accountService";
import { Account } from "@/types/account";
import {
  createTransaction,
  getAllTransactions,
  importTransactionsFromCsv,
  deleteTransaction,
  updateTransaction,
} from "@/services/transactionService";
import { CreateTransactionInput, Transaction } from "@/types/transaction";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const loadTransactions = async () => {
    try {
      setLoading(true);

      const [transactionsData, accountsData] = await Promise.all([
        getAllTransactions(),
        getAccounts(),
      ]);

      setTransactions(transactionsData);
      setAccounts(accountsData);
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

  const handleUpdateTransaction = async (
    id: string,
    data: Partial<CreateTransactionInput>,
  ) => {
    await updateTransaction(id, data);
    await loadTransactions();
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm("Delete this transaction?");

    if (!confirmed) {
      return;
    }

    await deleteTransaction(transactionId);

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

        <AddTransactionForm
          onAddTransaction={handleAddTransaction}
          accounts={accounts}
        />

        <TransactionImportForm
          onImportTransactions={handleImportTransactions}
        />

        {loading ? (
          <p className="text-slate-400">Loading transactions...</p>
        ) : (
          <TransactionsTable
            transactions={transactions}
            accounts={accounts}
            onDeleteTransaction={handleDeleteTransaction}
            onUpdateTransaction={handleUpdateTransaction}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
