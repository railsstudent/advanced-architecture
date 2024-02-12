import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Alarm } from '~alarms/domain/alarm';
import { AlarmFactory } from '~alarms/domain/factories/alarm.factory';
import { AlarmRepository } from '../ports/alarm.repository';
import { CreateAlarmCommand } from './create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alamRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  execute(command: CreateAlarmCommand): Promise<Alarm> {
    this.logger.debug(
      `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
    );

    const alarm = this.alarmFactory.create(command.name, command.severity);
    return this.alamRepository.save(alarm);
  }
}
