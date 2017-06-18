const simpleStorage = require('simplestorage.js');

export default class AsyncStorageWeb {
  static async setItem(key: string, value: string): Promise<void> {
    simpleStorage.set(key, value);
  }

  static async getItem(key: string): Promise<string> {
    return simpleStorage.get(key);
  }

  static async removeItem(key: string): Promise<void> {
    simpleStorage.deleteKey(key);
  }
}
