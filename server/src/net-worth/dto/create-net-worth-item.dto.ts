import { NetWorthItemType } from '@prisma/client';

export class CreateNetWorthItemDto {
  name: string;
  amount: number;
  type: NetWorthItemType;
  category: string;
  note?: string;
}