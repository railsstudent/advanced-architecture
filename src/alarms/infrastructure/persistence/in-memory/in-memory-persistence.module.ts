import { Module } from '@nestjs/common';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { FindAlarmsRepository } from '~alarms/application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '~alarms/application/ports/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    InMemoryAlarmRepository,
    {
      provide: CreateAlarmRepository,
      useExisting: InMemoryAlarmRepository, // 💡 This is where we bind the port to an adapter
    },
    {
      provide: FindAlarmsRepository,
      useExisting: InMemoryAlarmRepository, // 💡 This is where we bind the port to an adapter
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmRepository, // 💡 This is where we bind the port to an adapter
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryAlarmPersistenceModule {}
