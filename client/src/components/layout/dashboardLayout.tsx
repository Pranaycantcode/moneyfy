import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8">
          <p className="text-sm text-slate-400">Personal Finance Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Moneyfy</h1>
        </header>

        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;