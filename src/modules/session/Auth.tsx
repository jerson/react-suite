import SingleStorage from '../storage/SingleStorage';
import Request from '../network/Request';
import Emitter from '../listener/Emitter';
import Log from '../logger/Log';

export interface UserSettings {
  headerName?: string;
  authPath?: string;
}

export interface Settings {
  headerName: string;
  authPath: string;
}

export interface User {
  [key: string]: string | boolean | number;
}

export default class Auth {
  public static settings: Settings = {
    headerName: 'X-APIKey',
    authPath: 'auth/me'
  };
  private static user: User = {};
  private static accessToken = '';

  static async init(settings?: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }
    Log.info('[AUTH]', 'init');
    await this.checkLogin();
  }

  static async checkLogin() {
    if (this.isLoggedIn()) {
      return;
    }

    Log.info('[AUTH]', 'checkLogin');
    let data = await SingleStorage.get('accessToken');
    if (data) {
      await this.login(data);
    } else {
      Log.info('[AUTH]', 'onNoLogin');
      Emitter.emit('onNoLogin', true);
    }
  }

  static async login(tmpAccessToken: string): Promise<boolean> {
    Log.info('[AUTH]', 'login', tmpAccessToken);
    let isOk = false;
    try {
      this.accessToken = tmpAccessToken;
      let response = await Request.get(
        this.settings.authPath,
        {},
        'auth_login',
        { secure: true }
      );
      this.user = response.body;
      await this.setAccessToken(tmpAccessToken);
      Log.info('[AUTH]', 'onSuccessLogin');
      Emitter.emit('onSuccessLogin', this.user);
      isOk = true;
    } catch (e) {
      Log.warn('[AUTH]', 'login', e);
      this.accessToken = '';
      Emitter.emit('onNoLogin', true);
    }

    return isOk;
  }

  static isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  static getAccessToken(): string {
    return this.accessToken;
  }

  static getUser(): User {
    return this.user;
  }

  static async setAccessToken(value: string): Promise<boolean> {
    this.accessToken = value;
    return SingleStorage.set('accessToken', value);
  }

  static async logout(): Promise<boolean> {
    Log.info('[AUTH]', 'logout');

    this.accessToken = '';
    this.user = {};
    Emitter.emit('onNoLogin', true);

    let ok = false;
    try {
      ok = await SingleStorage.remove('accessToken');
    } catch (e) {
      Log.error('[AUTH]', 'logout', e);
    }

    return ok;
  }
}
