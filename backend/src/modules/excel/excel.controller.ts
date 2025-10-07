import { Controller, Get, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('export-lsa')
  async exportLSA(@Res() res: Response) {
    const buffer = await this.excelService.exportLSA();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=ExcelLSA.xlsx',
    });
    res.send(buffer);
  }

  @Get('export-time-study')
  async exportTimeStudy() {
    return this.excelService.exportTimeStudy();
  }
}
