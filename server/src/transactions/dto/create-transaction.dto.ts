import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  accountId?: string;
  note?: string;
}