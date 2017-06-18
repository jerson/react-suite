const PouchDB = require('pouchdb-browser');
import Log from '../logger/Log';

export interface UserSettings {
  schemaVersion?: number;
  path?: string;
}

export interface Settings {
  schemaVersion: number;
  path: string;
}

export interface Cache {
  _id: string;
  value?: string;
}

export default class CacheStorageWeb {
  public static settings: Settings = { path: 'cache.realm', schemaVersion: 1 };
  private static db: any;

  static init(settings: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }

    if (this.db) {
      return;
    }

    this.db = new PouchDB(this.settings.path);
  }

  static async set(key: string, value: any): Promise<boolean> {
    let keyEncoded = this.hashCode(key);
    let doc: Cache = { _id: '', value: '' };

    try {
      doc = await this.db.get(keyEncoded);
    } catch (err) {
      Log.warn('[CACHE]', err);
    }

    doc.value = value;
    if (!doc._id) {
      doc._id = keyEncoded;
    }

    let result = false;
    try {
      await this.db.put(doc);
      result = true;
    } catch (e) {
      Log.warn('[CACHE]', e);
    }

    return result;
  }

  static async get(key: string): Promise<any> {
    let data: Cache = { _id: '', value: '' };

    try {
      data = await this.db.get(this.hashCode(key));
    } catch (e) {
      Log.warn('[CACHE]', e);
    }
    return data.value;
  }

  static async remove(key: string): Promise<boolean> {
    let data = {
      _id: this.hashCode(key)
    };
    let result = false;
    try {
      await this.db.remove(data);
      result = true;
    } catch (e) {
      Log.warn('[CACHE]', e);
    }
    return result;
  }

  private static hashCode(text: string): string {
    let hash = 0,
      i,
      chr,
      len;
    if (text.length === 0) {
      return hash.toString();
    }
    for (i = 0, len = text.length; i < len; i++) {
      chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return 'K' + hash;
  }
}
