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
import { CreateNetWorthItemDto } from './dto/create-net-worth-item.dto';
import { UpdateNetWorthItemDto } from './dto/update-net-worth-item.dto';
import { NetWorthService } from './net-worth.service';

@Controller('net-worth')
@UseGuards(JwtAuthGuard)
export class NetWorthController {
  constructor(private readonly netWorthService: NetWorthService) {}

  @Post()
  create(
    @CurrentUser() user: { userId: string; email: string },
    @Body() createDto: CreateNetWorthItemDto,
  ) {
    return this.netWorthService.create(user.userId, createDto);
  }

  @Get()
  findAll(@CurrentUser() user: { userId: string; email: string }) {
    return this.netWorthService.findAll(user.userId);
  }

  @Get('summary')
  getSummary(@CurrentUser() user: { userId: string; email: string }) {
    return this.netWorthService.getSummary(user.userId);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.netWorthService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
    @Body() updateDto: UpdateNetWorthItemDto,
  ) {
    return this.netWorthService.update(user.userId, id, updateDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.netWorthService.remove(user.userId, id);
  }
}