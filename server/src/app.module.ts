import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GoalsModule } from './goals/goals.module';
import { NetWorthModule } from './net-worth/net-worth.module';
import { RecurringTransactionsModule } from './recurring-transactions/recurring-transactions.module';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';
import { BudgetsModule } from './budgets/budgets.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      connection: process.env.REDIS_URL
        ? {
            url: process.env.REDIS_URL,
          }
        : {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
          },
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TransactionsModule,
    GoalsModule,
    NetWorthModule,
    RecurringTransactionsModule,
    BudgetsModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
