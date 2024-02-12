import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Alarm } from '~alarms/domain/alarm';
import { AlarmRepository } from '../ports/alarm.repository';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery> {
  constructor(private readonly alarmRepository: AlarmRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_query: GetAlarmsQuery): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}
