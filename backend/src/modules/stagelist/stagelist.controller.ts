import {
  Body,
  Controller,
  Post,
  Req,
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
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateStagelistDto,
  ) {
    console.log(files);
    return await this.stagelistService.stagelistUpload(body, files);
  }
}
