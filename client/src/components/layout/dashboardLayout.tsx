"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { clearAuthToken } from "@/services/authService";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.push("/auth");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Personal Finance Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Moneyfy</h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white"
          >
            Logout
          </button>
        </header>

        <nav className="mb-8 flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm text-slate-300"
          >
            Dashboard
          </Link>

          <Link
            href="/transactions"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm text-slate-300"
          >
            Transactions
          </Link>
        </nav>

        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
