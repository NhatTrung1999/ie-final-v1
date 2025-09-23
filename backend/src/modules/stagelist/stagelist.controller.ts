import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { StagelistService } from './stagelist.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateStagelistDto } from './dto/create-stagelist.dto';

@Controller('stagelist')
export class StagelistController {
  constructor(private readonly stagelistService: StagelistService) {}

  @Post('stagelist-upload')
  @UseInterceptors(FilesInterceptor('files'))
  async stagelistUpload(
    @Body() createStagelistDto: CreateStagelistDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.stagelistService.stagelistUpload(
      createStagelistDto,
      files,
    );
  }
}
