import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NetWorthController } from './net-worth.controller';
import { NetWorthService } from './net-worth.service';

@Module({
  imports: [PrismaModule],
  controllers: [NetWorthController],
  providers: [NetWorthService],
})
export class NetWorthModule {}