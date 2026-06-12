import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class RecurringTransactionsService {
  constructor(
  private readonly prisma: PrismaService,
  @InjectQueue('recurring-transactions')
  private readonly recurringQueue: Queue,
) {}

  async create(userId: string, createDto: CreateRecurringTransactionDto) {
    return this.prisma.recurringTransaction.create({
      data: {
        title: createDto.title,
        amount: createDto.amount,
        type: createDto.type,
        category: createDto.category,
        frequency: createDto.frequency,
        startDate: new Date(createDto.startDate),
        nextRunDate: new Date(createDto.nextRunDate),
        note: createDto.note,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.recurringTransaction.findMany({
      where: { userId },
      orderBy: { nextRunDate: 'asc' },
    });
  }

  async findOne(userId: string, recurringTransactionId: string) {
    const recurringTransaction =
      await this.prisma.recurringTransaction.findUnique({
        where: { id: recurringTransactionId },
      });

    if (!recurringTransaction) {
      throw new NotFoundException('Recurring transaction not found');
    }

    if (recurringTransaction.userId !== userId) {
      throw new ForbiddenException(
        'You cannot access this recurring transaction',
      );
    }

    return recurringTransaction;
  }

  async update(
    userId: string,
    recurringTransactionId: string,
    updateDto: UpdateRecurringTransactionDto,
  ) {
    await this.findOne(userId, recurringTransactionId);

    return this.prisma.recurringTransaction.update({
      where: { id: recurringTransactionId },
      data: {
        ...updateDto,
        startDate: updateDto.startDate
          ? new Date(updateDto.startDate)
          : undefined,
        nextRunDate: updateDto.nextRunDate
          ? new Date(updateDto.nextRunDate)
          : undefined,
      },
    });
  }

  async remove(userId: string, recurringTransactionId: string) {
    await this.findOne(userId, recurringTransactionId);

    return this.prisma.recurringTransaction.delete({
      where: { id: recurringTransactionId },
    });
  }

  async toggleStatus(userId: string, recurringTransactionId: string) {
    const recurringTransaction = await this.findOne(
      userId,
      recurringTransactionId,
    );

    return this.prisma.recurringTransaction.update({
      where: { id: recurringTransactionId },
      data: {
        isActive: !recurringTransaction.isActive,
      },
    });
  }

  async addTestJob(userId: string) {
  const job = await this.recurringQueue.add('test-recurring-job', {
    userId,
    message: 'Recurring transaction queue is working',
  });

  return {
    message: 'Job added successfully',
    jobId: job.id,
  };
}
}