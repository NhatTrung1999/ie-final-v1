import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  async validate(username: string, password: string) {
    const payload: any = await this.IE.query(
      `SELECT *
        FROM IE_Account
        WHERE UserID = ? AND [Password] = ?`,
      {
        replacements: [username, password],
        type: QueryTypes.SELECT,
      },
    );

    if (payload.length === 0) return false;
    return payload[0];
  }
}
