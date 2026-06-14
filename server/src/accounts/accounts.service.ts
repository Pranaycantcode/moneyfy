import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        name: createAccountDto.name,
        type: createAccountDto.type,
        balance: createAccountDto.balance,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('You cannot access this account');
    }

    return account;
  }

  async update(
    userId: string,
    accountId: string,
    updateAccountDto: UpdateAccountDto,
  ) {
    await this.findOne(userId, accountId);

    return this.prisma.account.update({
      where: { id: accountId },
      data: updateAccountDto,
    });
  }

  async remove(userId: string, accountId: string) {
    await this.findOne(userId, accountId);

    return this.prisma.account.delete({
      where: { id: accountId },
    });
  }

  async getSummary(userId: string) {
    const accounts = await this.prisma.account.findMany({
      where: { userId },
    });

    const totalBalance = accounts.reduce(
      (sum, account) => sum + account.balance,
      0,
    );

    return {
      totalBalance,
      accountCount: accounts.length,
    };
  }
}