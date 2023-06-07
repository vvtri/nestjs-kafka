import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { DynamicModule, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Kafka } from 'kafkajs';
import { subscribeInfos } from '../data';
import { KafkaModuleConfig } from '../interfaces/external.interface';
import { KafkaConsumer } from '../services/consumer.service';
import { KafkaProducer } from '../services/producer.service';

@Module({})
export class KafkaModule {
  static async forRoot({
    kafkaConfig,
    consumerConfig,
    producerConfig,
    schemaRegistryConfig,
    shouldReadFromBeginning = true,
    shouldRunConsumerAsync = true,
  }: KafkaModuleConfig): Promise<DynamicModule> {
    const kafka = new Kafka(kafkaConfig);
    const consumer = kafka.consumer(consumerConfig);
    const producer = kafka.producer(producerConfig);
    let registry: SchemaRegistry | undefined = undefined;

    if (schemaRegistryConfig) {
      registry = new SchemaRegistry(schemaRegistryConfig);
    }

    return {
      global: true,
      module: KafkaModule,
      providers: [
        {
          provide: KafkaConsumer,
          inject: [ModuleRef],
          useFactory: (moduleRef: ModuleRef) => {
            return new KafkaConsumer({
              consumer,
              subscribeInfos,
              moduleRef,
              registry,
              shouldReadFromBeginning,
              shouldRunConsumerAsync,
            });
          },
        },
        {
          provide: KafkaProducer,
          useFactory: () => {
            return new KafkaProducer(producer, registry);
          },
        },
      ],
      exports: [KafkaProducer],
    };
  }
}
