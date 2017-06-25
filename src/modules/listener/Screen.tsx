import { AppState, DeviceEventEmitter, Dimensions as Dm } from 'react-native';
import Emitter from './Emitter';
import Log from '../logger/Log';

const OrientationListener = require('react-native-orientation');

export type Orientation = 'PORTRAIT' | 'LANDSCAPE' | string;

export interface Dimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

export default class Screen {
  private static dimensions: Dimensions = {
    scale: 1,
    fontScale: 1,
    width: 1000,
    height: 1000
  };
  private static last: Orientation = 'PORTRAIT';
  private static first: Orientation;

  private static checkAppStateBinded: any;
  private static updateDimensionsBinded: any;

  static init() {
    this.updateDimensionsBinded = this.didUpdateDimensions.bind(this);
    this.checkAppStateBinded = this.checkAppState.bind(this);

    this.updateOrientation();
    this.updateDimensions();

    DeviceEventEmitter.addListener(
      'didUpdateDimensions',
      this.updateDimensionsBinded
    );

    AppState.addEventListener('change', this.checkAppStateBinded);
  }

  static getDimensions(): Dimensions {
    return this.dimensions;
  }

  static getOrientation(): Orientation {
    return this.last;
  }

  static destroy() {
    AppState.removeEventListener('change', this.checkAppStateBinded);
    DeviceEventEmitter.addListener(
      'didUpdateDimensions',
      this.updateDimensionsBinded
    );
  }

  static async updateOrientation(): Promise<Orientation> {
    return new Promise<Orientation>((resolve, reject) => {
      OrientationListener.getOrientation((err: any, orientation: string) => {
        if (!this.first) {
          this.first = orientation.replace('UPSIDEDOWN', '');
        }
        if (err) {
          reject(err);
        } else {
          resolve(this.orientationChange(orientation));
        }
      });
    });
  }

  static async updateDimensions(): Promise<Dimensions> {
    let dimensions = this.getScreenDimensions();
    this.didUpdateDimensions(dimensions);
    return dimensions;
  }

  private static didUpdateDimensions(update: Dimensions) {
    Log.log('[SCREEN]', 'didUpdateDimensions', update);
    let dimension = this.getScreenDimensions();
    //if (this.dimensions !== dimension) {
    this.dimensions = dimension;
    Emitter.emit('onDimensionsChange', this.dimensions);
    //this.updateOrientation();
    //}
  }

  private static checkAppState(newState: string) {
    if (newState === 'active') {
      this.updateOrientation();
    }
  }

  private static orientationChange(orientation: string): Orientation {
    orientation = orientation.replace('UPSIDEDOWN', '');

    if (!orientation || orientation === 'null') {
      return this.last;
    }

    this.last = orientation;

    Emitter.emit('onOrientationChange', orientation);
    Log.log('[SCREEN]', 'onOrientationChange', orientation);

    return this.last;
  }

  private static getScreenDimensions(): Dimensions {
    return Dm.get('window');
  }
}
