import SingleStorage from './SingleStorage';
import Log from '../logger/Log';

export interface UserSettings {
  defaults?: Preferences;
}

export interface Settings {
  defaults: Preferences;
}

export type PreferenceValue = boolean | string;

export interface Preferences {
  [key: string]: PreferenceValue;
}

export default class PreferencesStorage {
  public static settings: Settings = {
    defaults: {
      locale: 'auto',
      sampleBool: true
    }
  };
  static cache: any = {};

  static init(settings?: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }
  }

  static getDefault(key: string): PreferenceValue {
    return this.settings.defaults[key];
  }

  static async set(key: string, value: PreferenceValue): Promise<boolean> {
    if (typeof value === 'undefined') {
      return false;
    }
    this.cache[key] = value;
    let savedValue = '';
    Log.info('[PREF]', '[FAST]', 'set', key, this.cache[key]);
    if (typeof value === 'boolean') {
      savedValue = value ? 'ON' : 'OFF';
    } else {
      savedValue = value;
    }

    return SingleStorage.set(key, savedValue);
  }

  static async get(key: string): Promise<PreferenceValue> {
    if (typeof this.cache[key] !== 'undefined') {
      Log.info('[PREF]', '[FAST]', 'get', key, this.cache[key]);
      return this.cache[key];
    }

    let defaultValue = this.getDefault(key);
    let value: PreferenceValue = '';
    try {
      let data = await SingleStorage.get(key);

      if (
        (typeof data === 'undefined' || data === null) &&
        typeof defaultValue !== 'undefined'
      ) {
        value = defaultValue;
      } else if (data === 'ON') {
        value = true;
      } else if (data === 'OFF') {
        value = false;
      } else {
        value = data;
      }

      this.cache[key] = value;
    } catch (e) {
      if (typeof defaultValue !== 'undefined') {
        value = defaultValue;
      }
    }

    return value;
  }

  static async remove(key: string): Promise<boolean> {
    return SingleStorage.remove(key);
  }
}
