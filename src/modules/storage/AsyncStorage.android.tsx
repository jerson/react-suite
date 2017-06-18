const SharedPreferences = require('react-native-shared-preferences');

export default class AsyncStorageAndroid {
  static async setItem(key: string, value: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      SharedPreferences.setItem(key, value);
      resolve();
    });
  }

  static async getItem(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      SharedPreferences.getItem(key, (value: string) => {
        resolve(value);
      });
    });
  }

  static async removeItem(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      SharedPreferences.removeItem(key);
      resolve();
    });
  }
}
