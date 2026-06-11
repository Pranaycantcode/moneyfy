export class CreateGoalDto {
  title: string;
  targetAmount: number;
  currentAmount?: number;
  targetDate: string;
  note?: string;
}