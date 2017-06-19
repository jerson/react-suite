import PreferencesStorage from '../storage/PreferencesStorage';
import Emitter from '../listener/Emitter';
import Log from '../logger/Log';

export interface UserSettings {
  themes: Themes;
  defaultTheme?: string;
}

export interface Settings {
  themes: Themes;
  defaultTheme: string;
}

export type ThemeVar = string | number;

export interface SingleTheme {
  [key: string]: ThemeVar;
}

export interface Vars {
  [key: string]: ThemeVar;
}

export interface Themes {
  [key: string]: SingleTheme;
}

export default class Theme {
  public static settings: Settings = {
    themes: {},
    defaultTheme: 'default'
  };
  static theme: string = Theme.getDefaultTheme();
  static vars: Vars = {};

  static async init(settings: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }

    try {
      let theme = await this.getTheme();
      this.setTheme(theme);
    } catch (e) {
      Log.debug('[THEME]', e);
    }
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
