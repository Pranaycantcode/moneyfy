import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createGoalDto: CreateGoalDto) {
    return this.prisma.savingsGoal.create({
      data: {
        title: createGoalDto.title,
        targetAmount: createGoalDto.targetAmount,
        currentAmount: createGoalDto.currentAmount ?? 0,
        targetDate: new Date(createGoalDto.targetDate),
        note: createGoalDto.note,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.savingsGoal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, goalId: string) {
    const goal = await this.prisma.savingsGoal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (goal.userId !== userId) {
      throw new ForbiddenException('You cannot access this goal');
    }

    return goal;
  }

  async update(
    userId: string,
    goalId: string,
    updateGoalDto: UpdateGoalDto,
  ) {
    await this.findOne(userId, goalId);

    return this.prisma.savingsGoal.update({
      where: { id: goalId },
      data: {
        ...updateGoalDto,
        targetDate: updateGoalDto.targetDate
          ? new Date(updateGoalDto.targetDate)
          : undefined,
      },
    });
  }

  async remove(userId: string, goalId: string) {
    await this.findOne(userId, goalId);

    return this.prisma.savingsGoal.delete({
      where: { id: goalId },
    });
  }
}