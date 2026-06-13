import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { BullModule } from '@nestjs/bullmq';
import { RecurringTransactionsProcessor } from './processors/recurring-transactions.processor';
import { RecurringTransactionsScheduler } from './scheduler/recurring-transactions.scheduler';

@Module({
  imports: [
  PrismaModule,
  BullModule.registerQueue({
    name: 'recurring-transactions',
  }),
],
  controllers: [RecurringTransactionsController],
  providers: [RecurringTransactionsService, RecurringTransactionsProcessor, RecurringTransactionsScheduler],
})
export class RecurringTransactionsModule {}