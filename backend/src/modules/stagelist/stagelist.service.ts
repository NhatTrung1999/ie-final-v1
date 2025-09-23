import { Injectable } from '@nestjs/common';
import { CreateStagelistDto } from './dto/create-stagelist.dto';

@Injectable()
export class StagelistService {
  async stagelistUpload(
    createStagelistDto: CreateStagelistDto,
    files: Array<Express.Multer.File>,
  ) {
    const { date, season, stage, area, article } = createStagelistDto;
    console.log(date, season, stage, area, article, files);
    return {
      date,
      season,
      stage,
      area,
      article,
      files: files[0].path,
    };
  }
}
