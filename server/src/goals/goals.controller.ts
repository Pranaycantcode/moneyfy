import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalsService } from './goals.service';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(
    @CurrentUser() user: { userId: string; email: string },
    @Body() createGoalDto: CreateGoalDto,
  ) {
    return this.goalsService.create(user.userId, createGoalDto);
  }

  @Get()
  findAll(@CurrentUser() user: { userId: string; email: string }) {
    return this.goalsService.findAll(user.userId);
  }

  @Get('progress')
getProgress(@CurrentUser() user: { userId: string; email: string }) {
  return this.goalsService.getProgress(user.userId);
}

  @Get(':id')
  findOne(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.goalsService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.update(user.userId, id, updateGoalDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.goalsService.remove(user.userId, id);
  }
}