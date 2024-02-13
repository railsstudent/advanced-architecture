import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmAcknowledgedEvent } from '../events/alarm-acknowledged.event';
import { SerializedEventPayload } from '~shared/domain/interfaces/serializable-event';
import { UpsertMaterializedAlarmRepository } from '~alarms/application/ports/upsert-materialized-alarm.repository';

@EventsHandler(AlarmAcknowledgedEvent)
export class AlarmAcknowledgedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmAcknowledgedEvent>>
{
  private readonly logger = new Logger(AlarmAcknowledgedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmAcknowledgedEvent>) {
    this.logger.log(`Alarm acknowledged event: ${JSON.stringify(event)}`);
    // In a real-world application, we would have to ensure that this event is
    // redelivered in case of a failure. Otherwise, we would end up with an inconsistent state.
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarmId,
      isAcknowledged: true,
    });
  }
}
