export default class Log {
  static Enabled = __DEV__;

  static debug(message?: any, ...optionalParams: any[]): void {
    Log.Enabled && console.log(message, ...optionalParams);
  }

  static log(message?: any, ...optionalParams: any[]): void {
    Log.Enabled && console.log(message, ...optionalParams);
  }

  static warn(message?: any, ...optionalParams: any[]): void {
    Log.Enabled && console.warn(message, ...optionalParams);
  }

  static error(message?: any, ...optionalParams: any[]): void {
    Log.Enabled && console.error(message, ...optionalParams);
  }

  static info(message?: any, ...optionalParams: any[]): void {
    Log.Enabled && console.log(message, ...optionalParams);
  }
}
