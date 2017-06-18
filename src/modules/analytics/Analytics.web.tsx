/**
 * @flow
 */
import SEO from '../seo/SEO';
import Log from '../logger/Log';

export interface UserSettings {
  analyticsId: string;
  appName?: string;
}

export interface Settings {
  analyticsId: string;
  appName: string;
}

export default class AnalyticsWeb {
  public static settings: Settings = { analyticsId: '', appName: '' };
  private static isLoaded = false;

  static init(settings: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }
    Log.info('[GA]', 'init', this.settings);

    if (!SEO.isSEORequest() && !this.isLoaded) {
      (function(i: any, s: any, o: any, g: any, r: any, ab, mb) {
        i['GoogleAnalyticsObject'] = r;
        (i[r] =
          i[r] ||
          function() {
            (i[r].q = i[r].q || []).push(arguments);
          }), (i[r].l = new Date().getTime());
        let a = s.createElement(o);
        let m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(
        window,
        document,
        'script',
        '//www.google-analytics.com/analytics.js',
        'ga'
      );

      ga('create', this.settings.analyticsId, 'auto');
      this.isLoaded = true;
    }
  }

  static screenView(path: string): void {
    window.prerenderReady = true;
    Log.log('prerenderReady');
    setTimeout(function() {
      if (SEO.isSEORequest()) {
        window.callPhantom();
        Log.log('callPhantom');
      }
    }, 10);

    if (!path) {
      path = window.location.pathname;
    }

    try {
      if (typeof ga === 'function') {
        ga('send', 'pageview', path);
      }
    } catch (e) {
      Log.error('[GA]', e);
    }
  }

  static event(params: EventObject): void {
    if (typeof ga === 'function') {
      ga('send', 'event', {
        ...params
      });
    }
  }
}

export interface EventObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}

declare const ga: {
  l: number;
  q: any[];

  (command: 'send', hitType: 'event', eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: number, fieldsObject?: {}): void;

  (command: 'send', hitType: 'event', fieldsObject: EventObject): void;

  (command: 'send', hitType: 'screenView', page: string): void;

  (command: 'send', hitType: 'social', socialNetwork: string, socialAction: string, socialTarget: string): void;

  (command: 'send', hitType: 'social', fieldsObject: {
    socialNetwork: string;
    socialAction: string;
    socialTarget: string;
  }): void;

  (command: 'send', hitType: 'timing', timingCategory: string, timingVar: string, timingValue: number): void;

  (command: 'send', hitType: 'timing', fieldsObject: {
    timingCategory: string;
    timingVar: string;
    timingValue: number;
  }): void;

  (command: 'send', fieldsObject: {}): void;

  (command: 'create', trackingId: string, cookieDomain?: string, name?: string, fieldsObject?: {}): void;

  (command: 'remove'): void;

  (command: string, ...fields: any[]): void;

  remove(name: string): void;
};
