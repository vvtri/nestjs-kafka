import { Logger } from '@nestjs/common';

export class LogService {
  logger = new Logger('KafakaModule');

  warnSubcribeTopicTwice(container: Map<string, any>, topic: string) {
    if (container.has(topic))
      this.logger.warn(`Listen twice of topic ${topic}`);
  }

  warnNotSubcribeAnyTopic() {
    this.logger.warn(`You did not subscribe to any topic, auto disconnect`);
  }

  warnContextHasNotBeenInstanced(name: string) {
    this.logger.warn(
      `Dependency ${name} has not been instantiated, auto instantiate it`
    );
  }

  errorParseBySchemaButSchemaRegistryNotfound(topic: string) {
    this.logger.error(`Subscribe to ${topic} and parse by schema but schema registry not found`)
  }
  
  errorSendMessageWithSchemaIdButSchemaRegistryNotFound(topic: string, schemaId: number) {
    this.logger.error(`Send message to ${topic} with schemaID: ${schemaId} but schema registry not found`)
  }

  subscribeToTopics(topics: Iterable<String>) {
    for (const topic of topics) {
      this.logger.log(`Subscribe to topic ${topic}`);
    }
  }

  consumerListening() {
    this.logger.log('Consumer is listening . . .');
  }

  consumerDisconnected() {
    this.logger.log('Consumer has disconnected successfully');
  }

  producerConnected() {
    this.logger.log('Producer is connected');
  }

  producerDisconnected() {
    this.logger.log('Producer has disconnected successfully');
  }
}

export const logService = new LogService();
