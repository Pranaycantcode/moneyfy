import { TransactionType } from '@prisma/client';

export class UpdateTransactionDto {
  title?: string;
  amount?: number;
  type?: TransactionType;
  category?: string;
  date?: string;
  note?: string;
}