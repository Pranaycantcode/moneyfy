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
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @CurrentUser() user: { userId: string; email: string },
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(user.userId, createTransactionDto);
  }

  @Get()
  findAll(@CurrentUser() user: { userId: string; email: string }) {
    return this.transactionsService.findAll(user.userId);
  }

  @Get('summary')
getSummary(
  @CurrentUser() user: { userId: string; email: string },
) {
  return this.transactionsService.getSummary(user.userId);
}

  @Get(':id')
  findOne(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.transactionsService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(user.userId, id, updateTransactionDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.transactionsService.remove(user.userId, id);
  }
}