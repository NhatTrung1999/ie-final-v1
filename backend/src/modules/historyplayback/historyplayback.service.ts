import { Injectable } from '@nestjs/common';
import { CreateHistoryplaybackDto } from './dto/create-historyplayback.dto';

@Injectable()
export class HistoryplaybackService {
  async historyplaybackList() {
    return 'historyplaybackList';
  }

  async historyplaybackCreate(body: CreateHistoryplaybackDto) {
    return 'historyplaybackCreate';
  }

  async historyplaybackDelete(id: string) {
    return 'historyplaybackDelete';
  }
}
