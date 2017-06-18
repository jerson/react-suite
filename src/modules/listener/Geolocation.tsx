import { PermissionsAndroid, Platform } from 'react-native';
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

export default class Geolocation {
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
    let allowed = await this.isAllowedToCheck();
    if (!allowed && forced) {
      allowed = await this.requestPermission();
    }
    if (allowed) {
      this.initWatcher();
    }
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
        this.options
      );
    } catch (e) {
      Log.warn('[GEOLOCATION]', '[ERROR]', e);
    }
  }

  private static async requestPermission() {
    Log.log('[GEOLOCATION]', 'requestPermission');

    let isAllowed = true;
    if (Platform.OS === 'android') {
      try {
        isAllowed = await PermissionsAndroid.requestPermission(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: this.settings.messageTitle,
            message: this.settings.messageDescription
          }
        );
      } catch (err) {
        Log.warn('[GEOLOCATION]', '[ERROR]', err);
        isAllowed = false;
      }
    }
    return isAllowed;
  }

  private static async isAllowedToCheck(): Promise<boolean> {
    Log.log('[GEOLOCATION]', 'isAllowedToCheck');
    let isAllowed = true;
    if (Platform.OS === 'android') {
      try {
        isAllowed = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      } catch (e) {
        Log.warn('[GEOLOCATION]', '[ERROR]', e);
        isAllowed = false;
      }
    }
    return isAllowed;
  }
}
