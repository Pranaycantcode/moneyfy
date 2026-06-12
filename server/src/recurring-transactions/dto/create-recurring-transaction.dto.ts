import { RecurringFrequency, TransactionType } from '@prisma/client';

export class CreateRecurringTransactionDto {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  frequency: RecurringFrequency;
  startDate: string;
  nextRunDate: string;
  note?: string;
}