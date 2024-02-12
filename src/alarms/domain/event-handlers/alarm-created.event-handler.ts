import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../events/alarm-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  handle(event: AlarmCreatedEvent) {
    this.logger.log(`Alarm created event: $${JSON.stringify(event, null, 2)}`);
  }
}
