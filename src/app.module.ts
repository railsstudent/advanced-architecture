import { Module } from '@nestjs/common';
import { AlarmsInfrastructureModule } from '~alarms/infrastructure/alarms-infrastructure.module';
import { ApplicationBootstrapOptions } from '~common/application-bootstrap-options.interface';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CoreModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CqrsModule.forRoot(),
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastructure(
          AlarmsInfrastructureModule.use(options.driver),
        ),
      ],
      exports: [],
    };
  }
}
