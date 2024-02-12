import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAlarmsRepository } from '~alarms/application/ports/find-alarms.repository';
import { AlarmReadModel } from '~alarms/domain/read-models/alarm.read-model';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<AlarmReadModel[]> {
    return this.alarmModel.find();
  }
}
