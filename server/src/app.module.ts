import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GoalsModule } from './goals/goals.module';
import { NetWorthModule } from './net-worth/net-worth.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TransactionsModule, GoalsModule, NetWorthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}