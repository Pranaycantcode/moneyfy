import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(
    @CurrentUser() user: { userId: string; email: string },
    @Body() createBudgetDto: CreateBudgetDto,
  ) {
    return this.budgetsService.create(user.userId, createBudgetDto);
  }

  @Get()
  findAll(@CurrentUser() user: { userId: string; email: string }) {
    return this.budgetsService.findAll(user.userId);
  }

  @Get('summary')
  getBudgetSummary(
    @CurrentUser() user: { userId: string; email: string },
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.budgetsService.getBudgetSummary(
      user.userId,
      Number(month),
      Number(year),
    );
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.budgetsService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetsService.update(user.userId, id, updateBudgetDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.budgetsService.remove(user.userId, id);
  }
}