import Emitter from './Emitter';
import { AppState, NetInfo, NetInfoReturnType, Platform } from 'react-native';
import Log from '../logger/Log';

export type NetworkType = 'OFF' | 'WIFI' | 'MOBILE' | 'UNKNOWN';

export default class Network {
  protected static isReady = true;
  private static last: NetworkType = 'UNKNOWN';
  private static changeListener: any;
  private static checkAppStateBinded: any;

  static init() {
    this.isReady = true;
    this.changeListener = this.stateChange.bind(this);
    NetInfo.addEventListener('change', this.changeListener);
    this.checkAppStateBinded = this.checkAppState.bind(this);
    AppState.addEventListener('change', this.checkAppStateBinded);
  }

  static destroy() {
    this.isReady = false;
    NetInfo.removeEventListener('change', this.changeListener);
    AppState.removeEventListener('change', this.checkAppStateBinded);
  }

  static isConnected(): boolean {
    return this.last !== 'OFF';
  }

  static getType(): NetworkType {
    return this.last;
  }

  static async updateNetworkType(): Promise<NetworkType> {
    Log.log('[NETWORK]', 'updateNetworkType');
    let info: NetInfoReturnType = await NetInfo.fetch();
    return await this.stateChange(info);
  }

  protected static checkAppState(newState: string) {
    if (newState === 'active') {
      this.updateNetworkType();
    }
  }

  protected static parse(reach: string): NetworkType {
    reach = reach.toUpperCase();
    let type: NetworkType = 'UNKNOWN';

    if (Platform.OS === 'ios') {
      switch (reach) {
        case 'NONE':
          type = 'OFF';
          break;
        case 'WIFI':
          type = 'WIFI';
          break;
        case 'CELL':
          type = 'MOBILE';
          break;
        case 'UNKNOWN':
        default:
          type = 'UNKNOWN';
          break;
      }
    } else if (Platform.OS === 'android') {
      switch (reach) {
        case 'NONE':
          type = 'OFF';
          break;
        case 'DUMMY':
        case 'ETHERNET':
        case 'VPN':
        case 'WIFI':
        case 'WIMAX':
          type = 'WIFI';
          break;
        case 'MOBILE':
        case 'MOBILE_DUN':
        case 'MOBILE_HIPRI':
        case 'MOBILE_SUPL':
          type = 'MOBILE';
          break;
        case 'BLUETOOTH':
        case 'UNKNOWN':
        default:
          type = 'UNKNOWN';
          break;
      }
    }

    return type;
  }

  protected static async stateChange(reach: string): Promise<NetworkType> {
    Log.log('[NETWORK]', 'onNetworkStateChange', reach);
    this.last = Network.parse(reach);
    Emitter.emit('onNetworkStateChange', this.last);
    return this.last;
  }
}
