import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
