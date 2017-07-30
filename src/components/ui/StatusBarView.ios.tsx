import * as React from 'react';
import {StatusBar, StatusBarProperties, ViewStyle} from 'react-native';
import View from './View';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface StatusBarViewProps extends StatusBarProperties {
    backgroundColor?: string;
    barStyle?: 'default' | 'light-content';
}

export interface State {
}

export default class StatusBarViewIOS extends BaseComponent<StatusBarViewProps,
    State> {

    render() {
        let {backgroundColor, barStyle, ...props} = this.props;
        const {styles, theme} = this;

        let backgroundColorFinal =
            backgroundColor || theme.statusBarViewBackgroundIOSColor;
        let barStyleFinal = barStyle || 'default';
        return (
            <View
                style={[styles.container, {backgroundColor: backgroundColorFinal}]}
                {...props}
            >
                <StatusBar
                    backgroundColor={backgroundColorFinal}
                    barStyle={barStyleFinal}
                />
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                height: 20
            } as ViewStyle
        };
    }
}
