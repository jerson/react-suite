import Emitter from '../listener/Emitter';
import { ThemeVars } from './ThemeBuilder';
import Theme from './Theme';

export interface Style {
  [key: string]: any;
}

export type ThemeCallback = (theme: ThemeVars) => Style;

export default class ThemeStyleSheet {
  private static onThemeChangeListener: any;
  private static theme: string;

  static init() {
    this.onThemeChangeListener = Emitter.on(
      'onThemeChange',
      this.onThemeChange.bind(this)
    );
  }

  static destroy() {
    Emitter.off(this.onThemeChangeListener);
  }

  static onThemeChange(theme: string) {
    this.theme = theme;
  }

  static create(callback: ThemeCallback): Style {
    return callback(Theme.vars);
  }
}
