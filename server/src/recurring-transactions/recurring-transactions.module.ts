import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { BullModule } from '@nestjs/bullmq';
import { RecurringTransactionsProcessor } from './processors/recurring-transactions.processor';

@Module({
  imports: [
  PrismaModule,
  BullModule.registerQueue({
    name: 'recurring-transactions',
  }),
],
  controllers: [RecurringTransactionsController],
  providers: [RecurringTransactionsService, RecurringTransactionsProcessor],
})
export class RecurringTransactionsModule {}