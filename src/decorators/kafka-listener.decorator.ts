import { subscribeInfos } from '../data';
import { SubscribeMetadataKey } from '../enums/subcribe-metadata-key.enum';
import { SubscribeHandler } from '../interfaces/internal.interface';
import { logService } from '../services/log.service';

export function KafkaListener() {
  return (constructor: Function) => {
    const target = constructor.prototype;

    for (const key of Object.getOwnPropertyNames(target)) {
      const subscribeHandler: SubscribeHandler | undefined =
        Reflect.getMetadata(
          SubscribeMetadataKey.SUBSCRIBE_HANDLER,
          target,
          key
        );

      if (!subscribeHandler) continue;

      const {
        topic,
        autoParseByJson: parseByJson,
        autoParseBySchema: parseBySchema,
      } = subscribeHandler;

      logService.warnSubcribeTopicTwice(subscribeInfos, topic);

      subscribeInfos.set(topic, {
        context: constructor,
        handler: target[key],
        topic,
        autoParseByJson: parseByJson,
        autoParseBySchema: parseBySchema,
      });
    }
  };
}
