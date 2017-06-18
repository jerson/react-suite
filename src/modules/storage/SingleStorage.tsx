import AsyncStorage from './AsyncStorage';

export default class SingleStorage {
  static async set(key: string, value: any): Promise<boolean> {
    if (typeof value === 'undefined') {
      return false;
    }
    value = typeof value !== 'string' ? value.toString() : value;

    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      return false;
    }
    return true;
  }

  static async get(key: string): Promise<string> {
    let data = '';
    try {
      data = await AsyncStorage.getItem(key);
    } catch (e) {
      return data;
    }
    return data;
  }

  static async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      return false;
    }
    return true;
  }
}
