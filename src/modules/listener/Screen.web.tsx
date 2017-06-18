import Emitter from '../listener/Emitter';
import Log from '../logger/Log';

export type Orientation = 'PORTRAIT' | 'LANDSCAPE' | string;

export interface Dimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

export default class ScreenWeb {
  private static dimensions: Dimensions = {
    scale: 1,
    fontScale: 1,
    width: 0,
    height: 0
  };
  private static last: Orientation = 'PORTRAIT';
  private static first: Orientation;

  private static handleResizeBinded: any;
  private static listener: any;

  static init(): void {
    this.handleResizeBinded = this.handleResize.bind(this);

    this.updateOrientation();
    this.updateDimensions();

    window.addEventListener('resize', this.handleResizeBinded);
  }

  static destroy(): void {
    window.removeEventListener('resize', this.handleResizeBinded);
  }

  static getDimensions(): Dimensions {
    return this.dimensions;
  }

  static getOrientation(): Orientation {
    return this.last;
  }

  static async updateOrientation(): Promise<Orientation> {
    if (!this.first) {
      this.first = this.last;
    }
    Emitter.emit('onOrientationChange', this.last);
    return this.last;
  }

  static async updateDimensions(): Promise<Dimensions> {
    return this.didUpdateDimensions();
  }

  private static getWidth() {
    let body = document.body || {};
    let element = document.documentElement || {};
    return (
      window.innerWidth ||
      body.offsetWidth ||
      element.clientWidth ||
      body.clientWidth
    );
  }

  private static getHeight() {
    let body = document.body || {};
    let element = document.documentElement || {};
    return (
      window.innerHeight ||
      body.offsetHeight ||
      element.clientHeight ||
      body.clientHeight
    );
  }

  private static getScreenDimensions(): Dimensions {
    return {
      width: this.getWidth(),
      height: this.getHeight(),
      scale: 1,
      fontScale: 1
    };
  }

  private static didUpdateDimensions(): Dimensions {
    this.dimensions = this.getScreenDimensions();

    Emitter.emit('onDimensionsChange', this.dimensions);

    return this.dimensions;
  }

  private static handleResize(): void {
    if (this.listener) {
      clearTimeout(this.listener);
    }
    this.listener = setTimeout(() => {
      Log.log('handleResize');
      this.didUpdateDimensions();
    }, 200);
  }
}
