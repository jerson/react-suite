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

      buttonDefaultIconColor: defaults.textSecondaryColor,
      buttonPrimaryIconColor: defaults.textActiveSecondaryColor,
      buttonDangerIconColor: defaults.textActiveSecondaryColor,
      buttonWarningIconColor: defaults.textActiveSecondaryColor,
      buttonInfoIconColor: defaults.textActiveSecondaryColor,
      buttonSuccessIconColor: defaults.textActiveSecondaryColor,

      buttonDefaultTextColor: defaults.textColor,
      buttonPrimaryTextColor: defaults.textActiveColor,
      buttonDangerTextColor: defaults.textActiveColor,
      buttonWarningTextColor: defaults.textActiveColor,
      buttonInfoTextColor: defaults.textActiveColor,
      buttonSuccessTextColor: defaults.textActiveColor,

      buttonDefaultBackgroundColor: defaults.defaultColor,
      buttonPrimaryBackgroundColor: defaults.primaryColor,
      buttonDangerBackgroundColor: defaults.dangerColor,
      buttonWarningBackgroundColor: defaults.warningColor,
      buttonInfoBackgroundColor: defaults.infoColor,
      buttonSuccessBackgroundColor: defaults.successColor,

      buttonDefaultShadowColor: TinyColor(defaults.defaultColor)
        .darken(4)
        .toHexString(),
      buttonPrimaryShadowColor: TinyColor(defaults.primaryColor)
        .darken(4)
        .toHexString(),
      buttonDangerShadowColor: TinyColor(defaults.dangerColor)
        .darken(4)
        .toHexString(),
      buttonWarningShadowColor: TinyColor(defaults.warningColor)
        .darken(4)
        .toHexString(),
      buttonInfoShadowColor: TinyColor(defaults.infoColor)
        .darken(4)
        .toHexString(),
      buttonSuccessShadowColor: TinyColor(defaults.successColor)
        .darken(4)
        .toHexString(),

      linkTextColor: defaults.primaryColor,
      linkIconColor: defaults.primaryColor,

      inputPlaceholderColor: defaults.textSecondaryColor,
      inputLabelColor: defaults.textSecondaryColor,
      inputBorderColor: defaults.borderColor,
      inputBackgroundColor: TinyColor(defaults.backgroundColor)
        .darken(2)
        .toHexString(),
      inputTextColor: defaults.textColor,

      inputErrorPlaceholderColor: defaults.dangerColor,
      inputErrorLabelColor: defaults.dangerColor,
      inputErrorBorderColor: defaults.dangerColor,
      inputErrorBackgroundColor: TinyColor(defaults.backgroundColor)
        .darken(2)
        .toHexString(),
      inputErrorTextColor: defaults.dangerColor
    };
  }
}
