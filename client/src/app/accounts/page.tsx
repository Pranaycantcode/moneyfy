"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import AccountSummary from "@/components/accounts/accountSummary";
import AddAccountForm from "@/components/accounts/addAccountForm";
import AccountsList from "@/components/accounts/accountsList";
import {
  createAccount,
  getAccountSummary,
  getAccounts,
} from "@/services/accountService";
import {
  Account,
  AccountSummary as AccountSummaryType,
  CreateAccountInput,
} from "@/types/account";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [summary, setSummary] = useState<AccountSummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAccounts = async () => {
    try {
      setLoading(true);

      const [accountsData, summaryData] = await Promise.all([
        getAccounts(),
        getAccountSummary(),
      ]);

      setAccounts(accountsData);
      setSummary(summaryData);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (accountData: CreateAccountInput) => {
    await createAccount(accountData);
    await loadAccounts();
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Accounts</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage bank accounts, cash wallets, investments, loans, and credit balances.
          </p>
        </div>

        {loading || !summary ? (
          <p className="text-slate-400">Loading accounts...</p>
        ) : (
          <>
            <AccountSummary summary={summary} />

            <AddAccountForm onAddAccount={handleAddAccount} />

            <AccountsList accounts={accounts} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}