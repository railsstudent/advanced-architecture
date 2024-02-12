import { Alarm } from '~alarms/domain/alarm';
import { AlarmItem } from '~alarms/domain/alarm-item';
import { AlarmSeverity } from '~alarms/domain/value-objects/alarm-severity';
import { AlarmItemEntity } from '../entities/alarm-item.entity';
import { AlarmEntity } from '../entities/alarm.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high',
    );
    const alarmModel = new Alarm(alarmEntity.id);
    alarmModel.name = alarmEntity.name;
    alarmModel.severity = alarmSeverity;
    alarmModel.isAcknowledged = alarmEntity.isAcknowledged;
    alarmModel.triggeredAt = alarmEntity.triggeredAt;
    alarmEntity.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );

    return alarmModel;
  }

  static toPersistence(alarm: Alarm): AlarmEntity {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.triggeredAt = alarm.triggeredAt;
    entity.severity = alarm.severity.value;
    entity.items = alarm.items.map((item) => {
      const itemEntity = new AlarmItemEntity();
      itemEntity.id = item.id;
      itemEntity.name = item.name;
      itemEntity.type = item.type;
      return itemEntity;
    });

    return entity;
  }
}
