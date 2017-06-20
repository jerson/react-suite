import ThemeBuilder, { ThemeDefaultVars } from '../ThemeBuilder';
import { AppTheme } from '../Theme';

let defaults: ThemeDefaultVars = {
  darkMode: false,

  defaultColor: '#efefef',
  primaryColor: '#1b6ce8',
  dangerColor: '#e83f19',
  warningColor: '#e86744',
  infoColor: '#25aeec',
  successColor: '#9ee853',

  textShadowColor: '#000',
  shadowColor: '#000',

  textColor: '#444',
  textSecondaryColor: '#999',

  textActiveColor: '#fff',
  textActiveSecondaryColor: '#f4f4f4',

  backgroundColor: '#fff',
  backgroundSecondaryColor: '#f4f4f4',

  borderColor: '#d4d4d4',
  borderSecondaryColor: '#e9e9e9'
};
let theme: AppTheme = ThemeBuilder.build(defaults);
export default theme;
