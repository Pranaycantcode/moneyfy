"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CategoryBreakdown } from "@/types/analytics";

interface CategoryBreakdownChartProps {
  data: CategoryBreakdown[];
}

const CategoryBreakdownChart = ({ data }: CategoryBreakdownChartProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Category Breakdown</h2>
      <p className="mt-1 text-sm text-slate-400">
        Expense distribution by category
      </p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius={95}
              label
            >
              {data.map((item) => (
                <Cell key={item.category} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CategoryBreakdownChart;