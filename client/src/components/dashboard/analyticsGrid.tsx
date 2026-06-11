 import SummaryCard from "./summaryCard";
import { TransactionSummary } from "@/types/analytics";

interface AnalyticsGridProps {
  summary: TransactionSummary;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const AnalyticsGrid = ({ summary }: AnalyticsGridProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Balance"
        value={formatCurrency(summary.balance)}
        helperText="Income minus expenses"
      />

      <SummaryCard
        title="Total Income"
        value={formatCurrency(summary.totalIncome)}
        helperText="All income recorded"
      />

      <SummaryCard
        title="Total Expenses"
        value={formatCurrency(summary.totalExpenses)}
        helperText="All expenses recorded"
      />

      <SummaryCard
        title="Savings Rate"
        value={`${summary.savingsRate}%`}
        helperText={`${summary.transactionCount} transactions tracked`}
      />
    </section>
  );
};

export default AnalyticsGrid;