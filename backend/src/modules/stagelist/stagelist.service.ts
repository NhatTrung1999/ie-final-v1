import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStagelistDto } from './dto/create-stagelist.dto';
import * as path from 'path';
import * as fs from 'fs';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IStageListData } from 'src/types/stagelist';
import { ConfigService } from '@nestjs/config';
import { ITablectData } from 'src/types/tablect';

@Injectable()
export class StagelistService {
  constructor(
    @Inject('IE') private readonly IE: Sequelize,
    private readonly configService: ConfigService,
  ) {}

  async stagelistUpload(
    createStagelistDto: CreateStagelistDto,
    files: Array<Express.Multer.File>,
  ) {
    try {
      const { date, season, stage, area, article } = createStagelistDto;
      let resData: IStageListData[] = [];

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

      resData = resData.map((item) => {
        const normalizedPath = item.Path.replace(/\\/g, '/');
        const relativePath = normalizedPath.split('/uploads')[1];
        return {
          ...item,
          Path: `${this.configService.get('BASEPATH')}/uploads${relativePath}`,
        };
      });

      return resData;
    } catch (error: any) {
      throw new InternalServerErrorException('Upload video failed!');
    }
  }

  async stagelistList() {
    let records: IStageListData[] = await this.IE.query(
      `SELECT *
        FROM IE_StageList
        ORDER BY CreatedAt`,
      { type: QueryTypes.SELECT },
    );
    records = records.map((item) => {
      const normalizedPath = item.Path.replace(/\\/g, '/');
      const relativePath = normalizedPath.split('/uploads')[1];
      return {
        ...item,
        Path: `${this.configService.get('BASEPATH')}/uploads${relativePath}`,
      };
    });
    // console.log(response);
    return records;
  }

  async stagelistDelete(id: string): Promise<IStageListData[]> {
    const record: IStageListData[] = await this.IE.query(
      `SELECT * FROM IE_StageList WHERE Id = ?`,
      { replacements: [id], type: QueryTypes.SELECT },
    );

    const checkExist: ITablectData[] = await this.IE.query(
      `SELECT * FROM IE_TableCT WHERE Id = ?`,
      { replacements: [id], type: QueryTypes.SELECT },
    );

    if (checkExist.length > 0) {
      throw new BadRequestException(
        'Please delete data related in TableCT before!',
      );
    }

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

    const records: IStageListData[] = await this.IE.query(
      `SELECT * FROM IE_StageList`,
      { replacements: [id], type: QueryTypes.SELECT },
    );

    return records;
  }
}
