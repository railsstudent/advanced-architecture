import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './comamnds/create-alarm.command';
import { AlarmFactory } from '~alarms/domain/factories/alarm.factory';
import { Alarm } from '~alarms/domain/alarm';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity,
    );

    return this.alarmRepository.save(alarm);
  }

  findAll(): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}
