import Log from '../logger/Log';
import {
  Analytics as AnalyticsBase,
  Experiment,
  Hits
} from 'react-native-google-analytics';
import Network from '../listener/Network';

const DeviceInfo = require('react-native-device-info');

export interface UserSettings {
  analyticsId: string;
  appName?: string;
}

export interface Settings {
  analyticsId: string;
  appName: string;
}

export default class Analytics {
  public static settings: Settings = { analyticsId: '', appName: '' };
  private static ga: any;

  static init(settings: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }

    if (!this.ga) {
      const userAgent = DeviceInfo.getUserAgent().replace(/[^\w\s./;()]/gi, '');
      this.ga = new AnalyticsBase(
        this.settings.analyticsId,
        DeviceInfo.getUniqueID(),
        1,
        userAgent
      );
    }

    Log.info('[GA]', 'init');
  }

  static screenView(path: string): void {
    if (!Network.isConnected()) {
      return;
    }

    let screenView = new Hits.ScreenView(
      this.settings.appName,
      path,
      DeviceInfo.getReadableVersion(),
      DeviceInfo.getBundleId()
    );
    this.ga.send(screenView);
  }

  static event(params: EventObject): void {
    if (!Network.isConnected()) {
      return;
    }

    let experiment = new Experiment(this.settings.appName, 'Exp');
    let screenView = new Hits.Event(
      params.eventCategory,
      params.eventAction,
      params.eventLabel,
      params.eventValue || 0,
      experiment
    );
    this.ga.send(screenView);
  }
}

export interface EventObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
