const DeviceInfo = require('react-native-device-info');

export function getDefaultLocale(): string {
  return DeviceInfo.getDeviceLocale();
}
