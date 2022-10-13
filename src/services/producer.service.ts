import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Producer, ProducerRecord as KafkaProducerRecord } from 'kafkajs';
import {
  ProducerOption,
  ProducerRecord,
} from '../interfaces/external.interface';
import { logService } from './log.service';

export class KafkaProducer implements OnModuleDestroy, OnModuleInit {
  constructor(private producer: Producer, private registry?: SchemaRegistry) {}

  async send<T = any>(
    record: ProducerRecord<T>,
    options: ProducerOption = { autoStringifyJson: true }
  ) {
    const { schemaId, autoStringifyJson } = options;

    if (schemaId) {
      if (!this.registry) {
        logService.errorSendMessageWithSchemaIdButSchemaRegistryNotFound(
          record.topic,
          schemaId
        );
      } else {
        record.messages = await Promise.all(
          record.messages.map(async (item) => {
            if (!this.registry) return item;

            item.value = (await this.registry.encode(
              schemaId,
              item.value
            )) as any;
            return item;
          })
        );
      }
    } else if (autoStringifyJson) {
      record.messages = record.messages.map((item) => {
        item.value = JSON.stringify(item.value) as any;
        return item;
      });
    }

    return this.producer.send(record as KafkaProducerRecord);
  }

  async onModuleInit() {
    await this.producer.connect();
    logService.producerConnected();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    logService.producerDisconnected();
  }
}
