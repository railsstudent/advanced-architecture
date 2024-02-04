import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './comamnds/create-alarm.command';

@Injectable()
export class AlarmsService {
  create(_createAlarmDto: CreateAlarmCommand) {
    return 'This action adds a new alarm';
  }

  findAll() {
    return `This action returns all alarms`;
  }
}
