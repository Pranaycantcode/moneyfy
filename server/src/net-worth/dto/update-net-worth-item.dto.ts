import { NetWorthItemType } from '@prisma/client';

export class UpdateNetWorthItemDto {
  name?: string;
  amount?: number;
  type?: NetWorthItemType;
  category?: string;
  note?: string;
}