import ThemeBuilder, { ThemeDefaultVars, ThemeVars } from '../ThemeBuilder';

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

  textColor: '#555',
  textSecondaryColor: '#999',

  textActiveColor: '#fff',
  textActiveSecondaryColor: 'rgba(255,255,255,0.7)',

  backgroundColor: '#fff',
  backgroundSecondaryColor: 'rgb(248, 248, 255)',

  backgroundDarkenColor: '#000',

  borderColor: '#f9f9f9',
  borderSecondaryColor: '#fafafa'
};
let theme: ThemeVars = ThemeBuilder.build(defaults);
export default theme;
