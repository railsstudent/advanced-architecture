import { Injectable } from '@nestjs/common';
import { Alarm } from 'src/alarms/domain/alarm';
import { CreateAlarmRepository } from '~alarms/application/ports/create-alarm.repository';
import { FindAlarmsRepository } from '~alarms/application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '~alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from '~alarms/domain/read-models/alarm.read-model';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  // convert to domain model
  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }

  upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    console.log('connie', alarm.items);

    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}
