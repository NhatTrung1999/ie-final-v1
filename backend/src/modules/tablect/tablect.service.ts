import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateTablectDto } from './dto/create-tablect.dto';
import { QueryTypes } from 'sequelize';
import { ITablectData } from 'src/types/tablect';
import { UpdateTablectDto } from './dto/update-tablect.dto';

@Injectable()
export class TablectService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  async getData() {
    const records: ITablectData[] = await this.IE.query(
      `SELECT *
        FROM IE_TableCT`,
      { type: QueryTypes.SELECT },
    );

    return records;
  }

  async createData(body: CreateTablectDto) {
    const {
      Id,
      No,
      ProgressStagePartName,
      Area,
      Path,
      Nva,
      Va,
      MachineType,
      IsSave,
      CreatedBy,
    } = body;
    await this.IE.query(
      `
      INSERT INTO IE_TableCT
          (Id, [No], ProgressStagePartName, Area, [Path], Nva, Va, MachineType, IsSave, CreatedBy, CreatedAt)
      VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE())`,
      {
        replacements: [
          Id,
          No,
          ProgressStagePartName,
          Area,
          Path,
          Nva,
          Va,
          MachineType,
          IsSave,
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

  async saveData(body: UpdateTablectDto) {
    const { Id, Nva, Va, IsSave } = body;
    await this.IE.query(
      `
      UPDATE IE_TableCT
      SET
          Nva = ?,
          Va = ?,
          IsSave = ?
      WHERE Id = ?`,
      {
        replacements: [Nva, Va, IsSave, Id],
        type: QueryTypes.UPDATE,
      },
    );

    const records: ITablectData[] = await this.IE.query(
      `SELECT *
        FROM IE_TableCT`,
      { replacements: [Id], type: QueryTypes.SELECT },
    );

    return records;
  }

  async deleteData(Id: string) {
    await this.IE.query(`DELETE FROM IE_TableCT WHERE Id = ?`, {
      replacements: [Id],
      type: QueryTypes.DELETE,
    });

    await this.IE.query(
      `DELETE FROM IE_HistoryPlayback WHERE HistoryPlaybackId = ?`,
      {
        replacements: [Id],
        type: QueryTypes.DELETE,
      },
    );

    const records: ITablectData[] = await this.IE.query(
      `SELECT *
        FROM IE_TableCT`,
      { replacements: [Id], type: QueryTypes.SELECT },
    );
    return records;
  }

  async confirmData(body: UpdateTablectDto) {
    const { Id, ConfirmId } = body;
    await this.IE.query(
      `
      UPDATE IE_TableCT
      SET
          ConfirmId = ?
      WHERE Id = ?`,
      {
        replacements: [ConfirmId, Id],
        type: QueryTypes.UPDATE,
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
