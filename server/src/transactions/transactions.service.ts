import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        title: createTransactionDto.title,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        category: createTransactionDto.category,
        date: new Date(createTransactionDto.date),
        note: createTransactionDto.note,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async getSummary(userId: string) {
  const transactions = await this.prisma.transaction.findMany({
    where: { userId },
  });

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'INCOME')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'EXPENSE')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? Number(((balance / totalIncome) * 100).toFixed(2))
      : 0;

  return {
    totalIncome,
    totalExpenses,
    balance,
    transactionCount: transactions.length,
    savingsRate,
  };
}

  async findOne(userId: string, transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException('You cannot access this transaction');
    }

    return transaction;
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.findOne(userId, transactionId);

    return this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        ...updateTransactionDto,
        date: updateTransactionDto.date
          ? new Date(updateTransactionDto.date)
          : undefined,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.findOne(userId, transactionId);

    return this.prisma.transaction.delete({
      where: { id: transactionId },
    });
  }
}