import { GoalProgress } from "@/types/goal";

interface GoalProgressListProps {
  goals: GoalProgress[];
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const getStatusLabel = (status: GoalProgress["status"]) => {
  switch (status) {
    case "COMPLETED":
      return "Completed";
    case "OVERDUE":
      return "Overdue";
    case "NOT_STARTED":
      return "Not Started";
    default:
      return "In Progress";
  }
};

const GoalProgressList = ({ goals }: GoalProgressListProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Savings Goals</h2>
        <p className="text-sm text-slate-400">
          Track progress toward your financial goals
        </p>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="rounded-xl bg-slate-900/80 p-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{goal.title}</h3>
                <p className="text-sm text-slate-400">
                  {formatCurrency(goal.currentAmount)} of{" "}
                  {formatCurrency(goal.targetAmount)}
                </p>
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                {getStatusLabel(goal.status)}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
              <span>{goal.progressPercentage}% complete</span>
              <span>{formatCurrency(goal.remainingAmount)} left</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GoalProgressList;