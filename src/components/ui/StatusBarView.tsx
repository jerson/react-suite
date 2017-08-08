import * as React from 'react';
import {Platform, StatusBar as StatusBarBase, StatusBarProperties, ViewStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface StatusBarViewProps extends StatusBarProperties {
    backgroundColor?: string;
    barStyle?: 'default' | 'light-content';
}

export interface State {
}

export default class StatusBarView extends BaseComponent<StatusBarViewProps,
    State> {

    render() {
        let {backgroundColor, barStyle, ...props} = this.props;
        const {styles, theme} = this;

        let backgroundColorFinal =
            backgroundColor ||
            (Platform.OS === 'android'
                ? theme.statusBarViewBackgroundAndroidColor
                : theme.statusBarViewBackgroundIOSColor);
        let barStyleFinal =
            barStyle || (Platform.OS === 'android' ? 'default' : 'default');

        return (
            <StatusBarBase
                barStyle={barStyleFinal}
                backgroundColor={backgroundColorFinal}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {

        return {
            container: {} as ViewStyle
        };
    }
}
