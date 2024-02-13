import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../events/alarm-created.event';
import { Logger } from '@nestjs/common';
import { UpsertMaterializedAlarmRepository } from '~alarms/application/ports/upsert-materialized-alarm.repository';
import { SerializedEventPayload } from '~shared/domain/interfaces/serializable-event';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmCreatedEvent>>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmCreatedEvent>) {
    this.logger.log(`Alarm created event: $${JSON.stringify(event)}`);

    const { alarm } = event;
    await this.upsertMaterializedAlarmRepository.upsert({
      id: alarm.id,
      name: alarm.name,
      severity: alarm.severity.value,
      triggeredAt: new Date(alarm.triggeredAt),
      isAcknowledged: alarm.isAcknowledged,
      items: alarm.items,
    });
  }
}
