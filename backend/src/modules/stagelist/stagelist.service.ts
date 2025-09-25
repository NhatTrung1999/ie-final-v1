import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStagelistDto } from './dto/create-stagelist.dto';
import * as path from 'path';
import * as fs from 'fs';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IStageListData } from 'src/types/stagelist';

@Injectable()
export class StagelistService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  async stagelistUpload(
    createStagelistDto: CreateStagelistDto,
    files: Array<Express.Multer.File>,
  ) {
    const { date, season, stage, area, article } = createStagelistDto;
    const resData: IStageListData[] = [];

    const basePath = path.join(
      process.cwd(),
      'uploads',
      date,
      season,
      stage,
      area,
      article,
    );
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
    for (let item of files) {
      const id = uuidv4();
      const filePath = path.join(basePath, item.filename);
      await this.IE.query(
        `INSERT INTO IE_StageList
        (
          Id,
          [Date],
          Season,
          Stage,
          Area,
          Article,
          Name,
          [Path],
          CreatedBy,
          CreatedFactory,
          CreatedAt
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          GETDATE()
        )`,
        {
          replacements: [
            id,
            date,
            season,
            stage,
            area,
            article,
            item.filename,
            filePath,
            'admin',
            'LYV',
          ],
          type: QueryTypes.INSERT,
        },
      );

      const result: IStageListData[] = await this.IE.query(
        `SELECT * FROM IE_StageList WHERE Id = ?`,
        { replacements: [id], type: QueryTypes.SELECT },
      );
      resData.push(result[0]);
    }

    return resData;
  }

  async stagelistDelete(id: string): Promise<string> {
    const record: IStageListData[] = await this.IE.query(
      `SELECT * FROM IE_StageList WHERE Id = ?`,
      { replacements: [id], type: QueryTypes.SELECT },
    );
    if (!record.length) {
      throw new NotFoundException(`No stagelist found with Id: ${id}`);
    }
    const { Path } = record[0];

    await this.IE.query(`DELETE FROM IE_StageList WHERE Id = ?`, {
      replacements: [id],
      type: QueryTypes.DELETE,
    });

    if (fs.existsSync(Path)) {
      fs.unlinkSync(Path);
    }

    const dir = path.dirname(Path);
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir, { recursive: true });
    }
    return `Stagelist with Id ${id} deleted successfully`;
  }
}
