import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
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
  async historyplaybackCreate(@Body() body: CreateHistoryplaybackDto) {
    return this.historyplaybackService.historyplaybackCreate(body);
  }

  @Delete('historyplayback-delete/:id')
  async historyplaybackDelete(@Param('id') id: string) {
    return this.historyplaybackService.historyplaybackDelete(id);
  }
}
