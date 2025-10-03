import { Inject, Injectable } from '@nestjs/common';
import { CreateHistoryplaybackDto } from './dto/create-historyplayback.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { IHistoryplaybackData } from 'src/types/historyplayback';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HistoryplaybackService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  async historyplaybackList() {
    const records: IHistoryplaybackData[] = await this.IE.query(
      `SELECT *
        FROM IE_HistoryPlayback`,
      { type: QueryTypes.SELECT },
    );
    return records;
  }

  async historyplaybackCreate(body: CreateHistoryplaybackDto[]) {
    const records: IHistoryplaybackData[] = [];
    for (let item of body) {
      const {
        Id,
        HistoryPlaybackId,
        Type,
        Start,
        Stop,
        CreatedBy,
        CreatedFactory,
      } = item;
      await this.IE.query(
        `INSERT INTO IE_HistoryPlayback
            (Id, HistoryPlaybackId, [Type], [Start], Stop, CreatedBy, CreatedFactory, CreatedAt)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, GETDATE())`,
        {
          replacements: [
            Id,
            HistoryPlaybackId,
            Type,
            Start,
            Stop,
            CreatedBy,
            CreatedFactory,
          ],
          type: QueryTypes.SELECT,
        },
      );

      const res: IHistoryplaybackData[] = await this.IE.query(
        `SELECT *
          FROM IE_HistoryPlayback
          WHERE Id = ?`,
        { replacements: [Id], type: QueryTypes.SELECT },
      );

      // return res[0];
      records.push(res[0]);
    }

    return records;
  }

  async historyplaybackDelete(Id: string, HistoryPlaybackId: string) {
    await this.IE.query(`DELETE FROM IE_HistoryPlayback WHERE Id = ?`, {
      replacements: [Id],
      type: QueryTypes.SELECT,
    });

    const records: IHistoryplaybackData[] = await this.IE.query(
      `SELECT *
        FROM IE_HistoryPlayback
        WHERE HistoryPlaybackId = ?`,
      { replacements: [HistoryPlaybackId], type: QueryTypes.SELECT },
    );
    return records;
  }
}
