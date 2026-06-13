import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class TransactionImportService {
  constructor(private readonly prisma: PrismaService) {}

  private parseCsvDate(dateValue: string) {
  if (!dateValue) {
    throw new Error('Date is missing in CSV row');
  }

  // Supports YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return new Date(dateValue);
  }

  // Supports DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateValue)) {
    const [day, month, year] = dateValue.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Supports DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
    const [day, month, year] = dateValue.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  throw new Error(`Invalid date format: ${dateValue}`);
}

  async importTransactions(
    userId: string,
    fileBuffer: Buffer,
  ) {
    const rows: any[] = [];

    const stream = Readable.from(fileBuffer);

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => {
          rows.push(row);
        })
        .on('end', async () => {
          try {
            let importedCount = 0;

            for (const row of rows) {
              await this.prisma.transaction.create({
                data: {
                  title: row.title,
                  amount: Number(row.amount),
                  type: row.type,
                  category: row.category,
                  date: this.parseCsvDate(row.date),
                  note: row.note || null,
                  userId,
                },
              });

              importedCount++;
            }

            resolve({
              importedCount,
            });
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });
  }
}