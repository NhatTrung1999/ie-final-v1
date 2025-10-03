import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateTablectDto } from './dto/create-tablect.dto';
import { QueryTypes } from 'sequelize';
import { ITablectData } from 'src/types/tablect';

@Injectable()
export class TablectService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  async saveData(body: CreateTablectDto) {
    console.log(body);
    const {
      Id,
      TablectId,
      No,
      ProgressStagePartName,
      Area,
      Path,
      Nva,
      Va,
      MachineType,
      CreatedBy,
    } = body;
    await this.IE.query(
      `
      INSERT INTO IE_TableCT
          (Id, TablectId, [No], ProgressStagePartName, Area, [Path], Nva, Va, MachineType, CreatedBy, CreatedAt)
      VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE())`,
      {
        replacements: [
          Id,
          TablectId,
          No,
          ProgressStagePartName,
          Area,
          Path,
          Nva,
          Va,
          MachineType,
          CreatedBy,
        ],
        type: QueryTypes.INSERT,
      },
    );

    const records: ITablectData[] = await this.IE.query(
      `SELECT *
        FROM IE_TableCT
        WHERE Id = ?`,
      { replacements: [Id], type: QueryTypes.SELECT },
    );

    return records[0];
  }
}
