import { Module } from '@nestjs/common';
import { StagelistService } from './stagelist.service';
import { StagelistController } from './stagelist.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StagelistController],
  providers: [StagelistService],
})
export class StagelistModule {}
