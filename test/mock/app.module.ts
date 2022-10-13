import { Module } from '@nestjs/common';
import { KafkaModule } from '../../src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { consumerConfig, kafkaConfig, testMockFn } from './config';

@Module({
  imports: [KafkaModule.forRoot({ kafkaConfig, consumerConfig })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: testMockFn.TEST_CONSUMER1,
      useValue: Function(),
    },
    {
      provide: testMockFn.TEST_PRODUCER1,
      useValue: Function(),
    },
  ],
})
export class AppModule {}
