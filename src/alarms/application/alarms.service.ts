import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Alarm } from '~alarms/domain/alarm';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll(): Promise<Alarm[]> {
    return this.queryBus.execute(new GetAlarmsQuery());
  }
}
