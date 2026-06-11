export class GoalProgressDto {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  note?: string | null;
  progressPercentage: number;
  remainingAmount: number;
  daysRemaining: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
}