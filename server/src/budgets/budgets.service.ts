import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createBudgetDto: CreateBudgetDto) {
    const existingBudget = await this.prisma.budget.findUnique({
      where: {
        category_month_year_userId: {
          category: createBudgetDto.category,
          month: createBudgetDto.month,
          year: createBudgetDto.year,
          userId,
        },
      },
    });

    if (existingBudget) {
      throw new BadRequestException(
        'Budget already exists for this category and month',
      );
    }

    return this.prisma.budget.create({
      data: {
        category: createBudgetDto.category,
        limit: createBudgetDto.limit,
        month: createBudgetDto.month,
        year: createBudgetDto.year,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.budget.findMany({
      where: { userId },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }

  async findOne(userId: string, budgetId: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { id: budgetId },
    });

    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    if (budget.userId !== userId) {
      throw new ForbiddenException('You cannot access this budget');
    }

    return budget;
  }

  async update(userId: string, budgetId: string, updateBudgetDto: UpdateBudgetDto) {
    await this.findOne(userId, budgetId);

    return this.prisma.budget.update({
      where: { id: budgetId },
      data: updateBudgetDto,
    });
  }

  async remove(userId: string, budgetId: string) {
    await this.findOne(userId, budgetId);

    return this.prisma.budget.delete({
      where: { id: budgetId },
    });
  }

  async getBudgetSummary(userId: string, month: number, year: number) {
    const budgets = await this.prisma.budget.findMany({
      where: {
        userId,
        month,
        year,
      },
    });

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        type: 'EXPENSE',
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });

    return budgets.map((budget) => {
      const spent = transactions
        .filter((transaction) => transaction.category === budget.category)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const remaining = budget.limit - spent;
      const usedPercentage =
        budget.limit > 0
          ? Number(((spent / budget.limit) * 100).toFixed(2))
          : 0;

      return {
        id: budget.id,
        category: budget.category,
        limit: budget.limit,
        spent,
        remaining,
        usedPercentage,
        month: budget.month,
        year: budget.year,
        status:
          spent > budget.limit
            ? 'OVER_BUDGET'
            : usedPercentage >= 80
              ? 'WARNING'
              : 'ON_TRACK',
      };
    });
  }
}