import { ConsumerHandler } from '../interfaces/internal.interface';

export type SubscribeInfoType = Map<string, ConsumerHandler>;
export const subscribeInfos: SubscribeInfoType = new Map();
