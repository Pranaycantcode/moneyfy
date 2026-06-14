import { TransactionType } from '@prisma/client';


export class UpdateTransactionDto {
  title?: string;
  amount?: number;
  type?: 'INCOME' | 'EXPENSE';
  category?: string;
  accountId?: string;
  note?: string;
  date?: string;
}