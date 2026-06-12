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
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { RecurringTransactionsService } from './recurring-transactions.service';

@Controller('recurring-transactions')
@UseGuards(JwtAuthGuard)
export class RecurringTransactionsController {
  constructor(
    private readonly recurringTransactionsService: RecurringTransactionsService,
  ) {}

  @Post()
  create(
    @CurrentUser() user: { userId: string; email: string },
    @Body() createDto: CreateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.create(user.userId, createDto);
  }

  @Post('test-job')
  addTestJob(@CurrentUser() user: { userId: string; email: string }) {
    return this.recurringTransactionsService.addTestJob(user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: { userId: string; email: string }) {
    return this.recurringTransactionsService.findAll(user.userId);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.recurringTransactionsService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
    @Body() updateDto: UpdateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.update(user.userId, id, updateDto);
  }

  @Patch(':id/toggle')
  toggleStatus(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.recurringTransactionsService.toggleStatus(user.userId, id);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.recurringTransactionsService.remove(user.userId, id);
  }
}
