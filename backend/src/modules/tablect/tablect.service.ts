import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateTablectDto } from './dto/create-tablect.dto';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ITablectData } from 'src/types/tablect';

@Injectable()
export class TablectService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  async saveData(body: CreateTablectDto) {
    const Id = uuidv4();
    const {
      TablectId,
      No,
      ProgressStagePartName,
      Area,
      Path,
      Nva,
      Va,
      MachineType,
      ConfirmId,
      CreatedBy,
    } = body;
    await this.IE.query(
      `
      INSERT INTO IE_TableCT
          (Id, TablectId, [No], ProgressStagePartName, Area, [Path], Nva, Va, MachineType, ConfirmId, CreatedBy, CreatedAt)
      VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE())`,
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
          ConfirmId,
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
