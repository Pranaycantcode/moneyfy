import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('recurring-transactions')
export class RecurringTransactionsProcessor extends WorkerHost {
  async process(job: Job) {
    console.log('Processing recurring transaction job:', {
      jobName: job.name,
      jobId: job.id,
      data: job.data,
    });

    return {
      success: true,
      processedAt: new Date().toISOString(),
    };
  }
}