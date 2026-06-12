import { RecurringFrequency, TransactionType } from '@prisma/client';

export class UpdateRecurringTransactionDto {
  title?: string;
  amount?: number;
  type?: TransactionType;
  category?: string;
  frequency?: RecurringFrequency;
  startDate?: string;
  nextRunDate?: string;
  note?: string;
  isActive?: boolean;
}