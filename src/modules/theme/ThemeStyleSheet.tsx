import {ThemeVars} from './ThemeBuilder';
import Theme from './Theme';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type Style = ViewStyle | TextStyle | ImageStyle;

export type NamedStyles<T> = {
    [P in keyof T]: Style;
    };

export type ThemeCallback<T> = (theme: ThemeVars) => T;

export default class ThemeStyleSheet {
    // private static onThemeChangeListener: any;
    // private static theme: string;
    //
    // static init() {
    //     this.onThemeChangeListener = Emitter.on(
    //         'onThemeChange',
    //         this.onThemeChange.bind(this)
    //     );
    // }
    //
    // static destroy() {
    //     Emitter.off(this.onThemeChangeListener);
    // }
    //
    // static onThemeChange(theme: string) {
    //     this.theme = theme;
    // }

    static create<T extends NamedStyles<T>>(callback: ThemeCallback<T>): T {
        return callback(Theme.vars);
    }
}
