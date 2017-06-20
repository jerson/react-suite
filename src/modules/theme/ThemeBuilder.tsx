const TinyColor = require('tinycolor2');
import { Platform } from 'react-native';
import { AppTheme } from './Theme';

export interface ThemeDefaultVars {
  darkMode: boolean;

  defaultColor: string;
  primaryColor: string;
  dangerColor: string;
  warningColor: string;
  infoColor: string;
  successColor: string;

  textShadowColor: string;
  shadowColor: string;

  textColor: string;
  textSecondaryColor: string;

  textActiveColor: string;
  textActiveSecondaryColor: string;

  backgroundColor: string;
  backgroundSecondaryColor: string;

  borderColor: string;
  borderSecondaryColor: string;
}

export default class ThemeBuilder {
  static allowShadow(): boolean {
    return !(Platform.OS === 'android' && Platform.Version < 21);
  }

  static build(defaults: ThemeDefaultVars): AppTheme {
    let allowShadow = this.allowShadow();
    return {
      defaults: defaults,
      darkMode: defaults.darkMode,

      loadingColor: defaults.textColor,

      statusBarBackgroundColor: TinyColor(defaults.backgroundColor).toString(),
      adsTextColor: defaults.textActiveColor
    };
  }
}
