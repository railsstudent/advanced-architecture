import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmReadModel } from '~alarms/domain/read-models/alarm.read-model';
import { FindAlarmsRepository } from '../ports/find-alarms.repository';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery> {
  constructor(private readonly alarmRepository: FindAlarmsRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
