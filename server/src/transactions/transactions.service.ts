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
    if (createTransactionDto.accountId) {
      const account = await this.prisma.account.findUnique({
        where: {
          id: createTransactionDto.accountId,
        },
      });

      if (!account || account.userId !== userId) {
        throw new NotFoundException('Account not found');
      }
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        title: createTransactionDto.title,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        category: createTransactionDto.category,
        date: new Date(createTransactionDto.date),
        note: createTransactionDto.note,
        userId,
        accountId: createTransactionDto.accountId,
      },
    });

    if (createTransactionDto.accountId) {
      const balanceChange =
        createTransactionDto.type === 'INCOME'
          ? createTransactionDto.amount
          : -createTransactionDto.amount;

      await this.prisma.account.update({
        where: {
          id: createTransactionDto.accountId,
        },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });
    }

    return transaction;
  }

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: {
        account: true,
      },
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
      totalIncome > 0 ? Number(((balance / totalIncome) * 100).toFixed(2)) : 0;

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
    const existingTransaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!existingTransaction || existingTransaction.userId !== userId) {
      throw new NotFoundException('Transaction not found');
    }

    const newAccountId =
      updateTransactionDto.accountId !== undefined
        ? updateTransactionDto.accountId || null
        : existingTransaction.accountId;

    if (newAccountId) {
      const account = await this.prisma.account.findUnique({
        where: {
          id: newAccountId,
        },
      });

      if (!account || account.userId !== userId) {
        throw new NotFoundException('Account not found');
      }
    }

    const oldSignedAmount =
      existingTransaction.type === 'INCOME'
        ? existingTransaction.amount
        : -existingTransaction.amount;

    const newType = updateTransactionDto.type ?? existingTransaction.type;

    const newAmount = updateTransactionDto.amount ?? existingTransaction.amount;

    const newSignedAmount = newType === 'INCOME' ? newAmount : -newAmount;

    if (existingTransaction.accountId) {
      await this.prisma.account.update({
        where: {
          id: existingTransaction.accountId,
        },
        data: {
          balance: {
            decrement: oldSignedAmount,
          },
        },
      });
    }

    if (newAccountId) {
      await this.prisma.account.update({
        where: {
          id: newAccountId,
        },
        data: {
          balance: {
            increment: newSignedAmount,
          },
        },
      });
    }

    return this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...updateTransactionDto,
        accountId: newAccountId,
        date: updateTransactionDto.date
          ? new Date(updateTransactionDto.date)
          : undefined,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.accountId) {
      const balanceAdjustment =
        transaction.type === 'INCOME'
          ? -transaction.amount
          : transaction.amount;

      await this.prisma.account.update({
        where: {
          id: transaction.accountId,
        },
        data: {
          balance: {
            increment: balanceAdjustment,
          },
        },
      });
    }

    return this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }

  async getRecent(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: {
        account: true,
      },
      orderBy: { date: 'desc' },
      take: 10,
    });
  }

  async getMonthlyAnalytics(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });

    const monthlyMap = new Map<
      string,
      { month: string; income: number; expenses: number; balance: number }
    >();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });

      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, {
          month,
          income: 0,
          expenses: 0,
          balance: 0,
        });
      }

      const current = monthlyMap.get(month)!;

      if (transaction.type === 'INCOME') {
        current.income += transaction.amount;
      }

      if (transaction.type === 'EXPENSE') {
        current.expenses += transaction.amount;
      }

      current.balance = current.income - current.expenses;
    });

    return Array.from(monthlyMap.values());
  }

  async getCategoryBreakdown(userId: string) {
    const expenses = await this.prisma.transaction.findMany({
      where: {
        userId,
        type: 'EXPENSE',
      },
    });

    const categoryMap = new Map<string, number>();

    expenses.forEach((expense) => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
    });

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
    }));
  }
}
