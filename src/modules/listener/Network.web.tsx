import Emitter from './Emitter';

export type NetworkType = 'OFF' | 'WIFI' | 'MOBILE' | 'UNKNOWN';

export default class NetworkWeb {
  private static last: NetworkType = 'UNKNOWN';

  private static onOnlineListener: any;
  private static onOfflineListener: any;

  static init() {
    this.onOnlineListener = this.onOnline.bind(this);
    this.onOfflineListener = this.onOffline.bind(this);
    window.addEventListener('offline', this.onOfflineListener);
    window.addEventListener('online', this.onOnlineListener);
  }

  static destroy() {
    window.removeEventListener('offline', this.onOfflineListener);
    window.removeEventListener('online', this.onOnlineListener);
  }

  static isConnected(): boolean {
    return this.last !== 'OFF';
  }

  static getType(): NetworkType {
    return this.last;
  }

  static async updateNetworkType(): Promise<NetworkType> {
    if (navigator.onLine) {
      this.onOnline();
    } else {
      this.onOffline();
    }
    return this.last;
  }

  private static onOnline() {
    this.last = 'WIFI';
    Emitter.emit('onNetworkStateChange', this.last);
  }

  private static onOffline() {
    this.last = 'OFF';
    Emitter.emit('onNetworkStateChange', this.last);
  }
}
