import { Body, Controller, Post } from '@nestjs/common';
import { TablectService } from './tablect.service';
import { CreateTablectDto } from './dto/create-tablect.dto';

@Controller('tablect')
export class TablectController {
  constructor(private readonly tablectService: TablectService) {}

  @Post('save-data')
  async saveData(@Body() body: CreateTablectDto) {
    // console.log(body);
    return this.tablectService.saveData(body);
  }
}
