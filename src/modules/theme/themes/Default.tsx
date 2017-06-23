import ThemeBuilder, { ThemeDefaultVars } from '../ThemeBuilder';
import { AppTheme } from '../Theme';

let defaults: ThemeDefaultVars = {
  darkMode: false,

  defaultColor: '#efefef',
  primaryColor: '#7367F0',
  dangerColor: '#EA5455',
  warningColor: '#F8D800',
  infoColor: '#0396FF',
  successColor: '#28C76F',

  textShadowColor: '#000',
  shadowColor: '#000',

  textColor: '#525252',
  textSecondaryColor: '#999',

  textActiveColor: '#fff',
  textActiveSecondaryColor: 'rgba(255,255,255,0.7)',

  backgroundColor: '#fff',
  backgroundSecondaryColor: 'rgb(248, 248, 255)',

  backgroundDarkenColor: '#000',

  borderColor: '#d4d4d4',
  borderSecondaryColor: '#e9e9e9'
};
let theme: AppTheme = ThemeBuilder.build(defaults);
export default theme;
