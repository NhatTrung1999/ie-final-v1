import { Module } from '@nestjs/common';
import { HistoryplaybackService } from './historyplayback.service';
import { HistoryplaybackController } from './historyplayback.controller';

@Module({
  controllers: [HistoryplaybackController],
  providers: [HistoryplaybackService],
})
export class HistoryplaybackModule {}
