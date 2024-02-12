import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { FindAlarmsRepository } from '~alarms/application/ports/find-alarms.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '~alarms/application/ports/upsert-materialized-alarm.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-materialized-alarm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity])],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository, // 💡 This is where we bind the port to an adapter
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistenceModule {}
