import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('recurring-transactions')
export class RecurringTransactionsProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job) {
    if (job.name !== 'process-recurring-transaction') {
      return;
    }

    const recurringTransactionId = job.data.recurringTransactionId;

    const recurringTransaction =
      await this.prisma.recurringTransaction.findUnique({
        where: {
          id: recurringTransactionId,
        },
      });

    if (!recurringTransaction || !recurringTransaction.isActive) {
      return;
    }

    await this.prisma.transaction.create({
      data: {
        title: recurringTransaction.title,
        amount: recurringTransaction.amount,
        type: recurringTransaction.type,
        category: recurringTransaction.category,
        date: new Date(),
        note: recurringTransaction.note,
        userId: recurringTransaction.userId,
      },
    });

    const nextRunDate = new Date(recurringTransaction.nextRunDate);

    switch (recurringTransaction.frequency) {
      case 'DAILY':
        nextRunDate.setDate(nextRunDate.getDate() + 1);
        break;

      case 'WEEKLY':
        nextRunDate.setDate(nextRunDate.getDate() + 7);
        break;

      case 'MONTHLY':
        nextRunDate.setMonth(nextRunDate.getMonth() + 1);
        break;

      case 'YEARLY':
        nextRunDate.setFullYear(nextRunDate.getFullYear() + 1);
        break;
    }
    await this.prisma.recurringTransaction.update({
      where: {
        id: recurringTransaction.id,
      },
      data: {
        nextRunDate,
      },
    });

    console.log(
      `Created transaction from recurring item ${recurringTransaction.id}`,
    );
  }
}
