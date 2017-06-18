const PubSub = require('pubsub-js');

export type Name =
  | 'onLocaleChange'
  | 'onLocationChange'
  | 'onDimensionsChange'
  | 'onOrientationChange'
  | 'onNoLogin'
  | 'onNetworkStateChange'
  | 'onSuccessLogin'
  | string;

export default class Emitter {
  static emit(name: Name, data: any): boolean {
    return PubSub.publish(name, data);
  }

  static on(name: Name, callback: Function): string {
    return PubSub.subscribe(name, (name: string, data: any) => {
      callback(data);
    });
  }

  static off(callback: string): void {
    return PubSub.unsubscribe(callback);
  }
}
