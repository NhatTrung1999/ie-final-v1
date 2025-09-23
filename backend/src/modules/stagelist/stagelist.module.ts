import { Module } from '@nestjs/common';
import { StagelistService } from './stagelist.service';
import { StagelistController } from './stagelist.controller';

@Module({
  controllers: [StagelistController],
  providers: [StagelistService],
})
export class StagelistModule {}
