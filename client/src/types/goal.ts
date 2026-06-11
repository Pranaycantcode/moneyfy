export type GoalStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "OVERDUE";

export interface GoalProgress {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  note?: string | null;
  progressPercentage: number;
  remainingAmount: number;
  daysRemaining: number;
  status: GoalStatus;
}