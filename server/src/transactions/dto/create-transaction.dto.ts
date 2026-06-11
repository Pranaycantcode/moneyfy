import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  note?: string;
}