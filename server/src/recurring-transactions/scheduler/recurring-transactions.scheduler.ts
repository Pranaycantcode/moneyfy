import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { RecurringTransactionsService } from '../recurring-transactions.service';

@Injectable()
export class RecurringTransactionsScheduler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recurringTransactionsService: RecurringTransactionsService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async processDueTransactions() {
    const now = new Date();

    const dueTransactions =
      await this.prisma.recurringTransaction.findMany({
        where: {
          isActive: true,
          nextRunDate: {
            lte: now,
          },
        },
      });

    for (const recurringTransaction of dueTransactions) {
      await this.recurringTransactionsService.queueRecurringTransaction(
        recurringTransaction.userId,
        recurringTransaction.id,
      );

      console.log(
        `Queued recurring transaction ${recurringTransaction.id}`,
      );
    }
  }
}