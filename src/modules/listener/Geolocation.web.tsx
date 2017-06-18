import Log from '../logger/Log';
import { _ } from '../i18n/Translator';
import Emitter from './Emitter';

export interface UserSettings {
  messageTitle?: string;
  messageDescription?: string;
}

export interface Settings {
  messageTitle: string;
  messageDescription: string;
}

export default class GeolocationWeb {
  public static options = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 0
  };

  public static settings: Settings = {
    messageTitle: _('Permission required'),
    messageDescription: _('must allow to continue')
  };
  private static lastPosition: Position;
  private static initialPosition: Position;
  private static watchID: number = 0;

  static init(settings?: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }

    this.checkWatcher(false);
  }

  static getPosition(): Coordinates {
    Log.log('[GEOLOCATION]', 'getPosition');
    return this.lastPosition.coords || this.initialPosition.coords;
  }

  static async checkWatcher(forced: boolean = true) {
    Log.log('[GEOLOCATION]', 'checkWatcher', forced);
    this.initWatcher();
  }

  static destroy() {
    try {
      navigator.geolocation.clearWatch(this.watchID);
    } catch (e) {
      Log.warn('[GEOLOCATION]', '[ERROR]', e);
    }
  }

  static async updateLocation(): Promise<Coordinates> {
    Log.log('[GEOLOCATION]', 'updateLocation');
    return new Promise<Coordinates>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        initialPosition => {
          this.initialPosition = initialPosition;
          let coords = initialPosition.coords;

          Emitter.emit('onLocationChange', coords);
          Log.log('[GEOLOCATION]', 'navigator', 'getCurrentPosition', coords);

          resolve(coords);
        },
        error => {
          reject(error);
          Log.warn('[GEOLOCATION]', '[ERROR]', error);
        },
        this.options
      );
    });
  }

  protected static initWatcher() {
    Log.log('[GEOLOCATION]', 'initWatcher');

    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
    this.updateLocation();
    try {
      const options = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 0
      };
      this.watchID = navigator.geolocation.watchPosition(
        lastPosition => {
          this.lastPosition = lastPosition;
          let coords = lastPosition.coords;

          Emitter.emit('onLocationChange', coords);
          Log.log('[GEOLOCATION]', 'navigator', 'watchPosition', coords);
        },
        error => {
          Log.warn('[GEOLOCATION]', '[ERROR]', error);
        },
        options
      );
    } catch (e) {
      Log.warn('[GEOLOCATION]', '[ERROR]', e);
    }
  }
}
