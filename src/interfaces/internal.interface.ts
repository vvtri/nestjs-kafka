import { ConsumerOption } from './external.interface';

export interface SubscribeHandler extends ConsumerOption {
  topic: string;
}

export interface ConsumerHandler extends ConsumerOption {
  topic: string;
  context: Function;
  handler: (...args: any[]) => any;
}
