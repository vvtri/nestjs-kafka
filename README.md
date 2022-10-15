## NestJs Kafka Client

### Description

A NestJS - KafkaJs Wrapper, wrapping on [KafkaJS](https://github.com/tulios/kafkajs)

### Installation

```bash
npm install @vvtri/nestjs-kafka
```
or yarn:
```bash
yarn add @vvtri/nestjs-kafka
```

### Add it to the NestJS app.module.ts

```ts
import { KafkaModule, ConsumerConfig, KafkaConfig, KafkaModuleConfig } from '@vvtri/nestjs-kafka';


const kafkaConfig: KafkaConfig = {
  clientId: 'my-app',
  brokers: ['localhost:9092'],
  ssl: false,
  connectionTimeout: 99999,
};

const consumerConfig: ConsumerConfig = {
  groupId: 'test',
  allowAutoTopicCreation: true,
};

@Module({
  imports: [KafkaModule.forRoot({ kafkaConfig, consumerConfig })],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

To see all available config, see `KafkaModuleConfig.`

### How to sendMessage

```ts
import {  KafkaProducer } from '@vvtri/nestjs-kafka';

@Injectable()
export class TaskKafkaProductService {
  constructor(private readonly kafkaProducer: KafkaProducer,) {}

  public async sendPushTask(kafkaTaskDto: KafkaTaskDto): Promise<any> {
     await this.kafkaProducer.send<KafkaTaskDto>(
      {
        topic: Topic,
        messages: [{ value: kafkaTaskDto }],
      },
      {
        autoStringifyJson: true,
      }
    );
  }
}
```

### How to Subscribe Message

```ts
import { EachMessagePayload, KafkaListener, SubscribeTo } from '@vvtri/nestjs-kafka';

@Injectable()
@KafkaListener()
export class TaskKafkaConsumerService {
  @SubscribeTo('task.push.info', { autoParseByJson: true //default true})
  taskSubscriber(payload: EachMessagePayload<string>): any {
    console.log('value', payload.message.value)
    console.log('header', payload.message.headers)
    console.log('key', payload.message.key)
  }
}
```
