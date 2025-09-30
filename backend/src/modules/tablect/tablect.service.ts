import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TablectService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  async saveData() {
    return 'save data';
  }
}
