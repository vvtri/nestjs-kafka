import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';
import { ConsumerConfig, KafkaConfig } from 'kafkajs';

export const Topic = 'TEST';

export const testMockFn = {
  TEST_PRODUCER1: 'TEST_PRODUCER1',
  TEST_CONSUMER1: 'TEST_CONSUMER',
};

export const kafkaConfig: KafkaConfig = {
  clientId: 'my-app',
  brokers: ['localhost:9092'],
  ssl: false,
  connectionTimeout: 99999,
};

export const consumerConfig: ConsumerConfig = {
  groupId: 'test',
  allowAutoTopicCreation: true,
};
