"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MonthlyAnalytics } from "@/types/analytics";

interface MonthlyCashflowChartProps {
  data: MonthlyAnalytics[];
}

const MonthlyCashflowChart = ({ data }: MonthlyCashflowChartProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Monthly Cashflow</h2>
      <p className="mt-1 text-sm text-slate-400">
        Compare income and expenses by month
      </p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" />
            <Bar dataKey="expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default MonthlyCashflowChart;