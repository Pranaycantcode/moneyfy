import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNetWorthItemDto } from './dto/create-net-worth-item.dto';
import { UpdateNetWorthItemDto } from './dto/update-net-worth-item.dto';

@Injectable()
export class NetWorthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createDto: CreateNetWorthItemDto) {
    return this.prisma.netWorthItem.create({
      data: {
        name: createDto.name,
        amount: createDto.amount,
        type: createDto.type,
        category: createDto.category,
        note: createDto.note,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.netWorthItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, itemId: string) {
    const item = await this.prisma.netWorthItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Net worth item not found');
    }

    if (item.userId !== userId) {
      throw new ForbiddenException('You cannot access this item');
    }

    return item;
  }

  async update(
    userId: string,
    itemId: string,
    updateDto: UpdateNetWorthItemDto,
  ) {
    await this.findOne(userId, itemId);

    return this.prisma.netWorthItem.update({
      where: { id: itemId },
      data: updateDto,
    });
  }

  async remove(userId: string, itemId: string) {
    await this.findOne(userId, itemId);

    return this.prisma.netWorthItem.delete({
      where: { id: itemId },
    });
  }

  async getSummary(userId: string) {
    const items = await this.prisma.netWorthItem.findMany({
      where: { userId },
    });

    const totalAssets = items
      .filter((item) => item.type === 'ASSET')
      .reduce((sum, item) => sum + item.amount, 0);

    const totalLiabilities = items
      .filter((item) => item.type === 'LIABILITY')
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      totalAssets,
      totalLiabilities,
      netWorth: totalAssets - totalLiabilities,
      itemCount: items.length,
    };
  }
}