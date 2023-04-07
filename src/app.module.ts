import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule.forRoot(), EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
