import * as Realm from 'realm';

export interface UserSettings {
  schemaVersion?: number;
  path?: string;
}

export interface Settings {
  schemaVersion: number;
  path: string;
}

const CacheSchema = {
  name: 'Cache',
  primaryKey: 'key',
  properties: {
    key: 'string',
    value: 'string'
  }
};

export interface Cache {
  key: string;
  value: string;
}

export default class CacheStorage {
  public static settings: Settings = { path: 'cache.realm', schemaVersion: 1 };
  private static realm: Realm;

  static init(settings: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }

    if (this.realm) {
      return;
    }

    this.realm = new Realm({
      schema: [CacheSchema],
      path: this.settings.path,
      schemaVersion: this.settings.schemaVersion
    });
  }

  static async set(key: string, value: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.realm.write(() => {
        let cache = this.realm.create(
          'Cache',
          {
            key: this.hashCode(key),
            value: JSON.stringify(value)
          },
          true
        );

        resolve(true);
      });
    });
  }

  static async get(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let keyEncoded = this.hashCode(key);
      let result = this.realm.objectForPrimaryKey<Cache>('Cache', keyEncoded);

      if (result && result.value) {
        resolve(JSON.parse(result.value));
      } else {
        reject({ code: 404, error: true });
      }
    });
  }

  static async remove(key: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let keyEncoded = this.hashCode(key);
      let results = this.realm
        .objects('Cache')
        .filtered(`key = '${keyEncoded}'`);
      this.realm.write(() => {
        if (results) {
          this.realm.delete(results);
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
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
