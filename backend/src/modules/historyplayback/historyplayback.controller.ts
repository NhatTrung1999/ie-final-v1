import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { HistoryplaybackService } from './historyplayback.service';
import { CreateHistoryplaybackDto } from './dto/create-historyplayback.dto';

@Controller('historyplayback')
export class HistoryplaybackController {
  constructor(
    private readonly historyplaybackService: HistoryplaybackService,
  ) {}

  @Get('historyplayback-list')
  async historyplaybackList() {
    return this.historyplaybackService.historyplaybackList();
  }

  @Post('historyplayback-create')
  async historyplaybackCreate(@Body() body: CreateHistoryplaybackDto[]) {
    // console.log(body);
    return this.historyplaybackService.historyplaybackCreate(body);
  }

  @Delete('historyplayback-delete')
  async historyplaybackDelete(
    @Query('Id') Id: string,
    @Query('HistoryPlaybackId') HistoryPlaybackId: string,
  ) {
    return this.historyplaybackService.historyplaybackDelete(
      Id,
      HistoryPlaybackId,
    );
  }
}
