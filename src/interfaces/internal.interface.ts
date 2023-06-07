import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { ModuleRef } from '@nestjs/core';
import { Consumer } from 'kafkajs';
import { SubscribeInfoType } from '../data';
import { ConsumerOption } from './external.interface';

export interface SubscribeHandler extends ConsumerOption {
  topic: string;
}

export interface ConsumerHandler extends ConsumerOption {
  topic: string;
  context: Function;
  handler: (...args: any[]) => any;
}

export interface KafkaConsumerParams {
  consumer: Consumer;
  subscribeInfos: SubscribeInfoType;
  moduleRef: ModuleRef;
  registry: SchemaRegistry | undefined;
  shouldReadFromBeginning: boolean;
  shouldRunConsumerAsync: boolean;
}
