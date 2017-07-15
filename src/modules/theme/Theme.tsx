import PreferencesStorage from '../storage/PreferencesStorage';
import Emitter from '../listener/Emitter';
import Log from '../logger/Log';
import Default from './themes/Default';
import Darker from './themes/Darker';
import Demo from './themes/Demo';
import { ThemeVars } from './ThemeBuilder';
import ThemeStyleSheet from './ThemeStyleSheet';

export interface UserSettings {
  themes: Themes;
  defaultTheme?: string;
}

export interface Settings {
  themes: Themes;
  defaultTheme: string;
}

// export interface AppTheme {
//     [key: string]: any;
// }

export interface Themes {
  [key: string]: ThemeVars;
}

export default class Theme {
  public static settings: Settings = {
    themes: { Default, Demo, Darker },
    defaultTheme: 'Demo'
  };
  static theme: string = Theme.getDefaultTheme();
  static vars: ThemeVars = Demo;

  static async init(settings: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }

    ThemeStyleSheet.init();

    try {
      let theme = await this.getTheme();
      this.setTheme(theme);
    } catch (e) {
      Log.debug('[THEME]', e);
    }
  }

  static destroy() {
    ThemeStyleSheet.destroy();
  }

  static setTheme(theme: string): void {
    this.theme = theme;
    this.vars = { ...this.vars, ...this.settings.themes[this.theme] };
    Emitter.emit('onThemeChange', this.theme);
  }

  static getTheme(): string {
    return this.theme;
  }

  static async getUserTheme(): Promise<string> {
    try {
      let data = await PreferencesStorage.get('theme');
      let theme = data.toString();
      return theme ? theme : this.getDefaultTheme();
    } catch (e) {
      return this.getDefaultTheme();
    }
  }

  static getDefaultTheme(): string {
    return this.settings.defaultTheme;
  }
}
