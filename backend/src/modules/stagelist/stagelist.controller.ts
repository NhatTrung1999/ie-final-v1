import {
  Body,
  Controller,
  Delete,
  Param,
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
    return await this.stagelistService.stagelistUpload(body, files);
  }

  @Delete('stagelist-delete/:id')
  async stagelistDelete(@Param('id') id: string) {
    return await this.stagelistService.stagelistDelete(id);
  }
}
