import { Controller, Post } from '@nestjs/common';
import { StagelistService } from './stagelist.service';

@Controller('stagelist')
export class StagelistController {
  constructor(private readonly stagelistService: StagelistService) {}

  @Post('stagelist-upload')
  async stagelistUpload() {
    return '123'
  }
}
