import * as React from 'react';
import {StatusBarProperties, ViewStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface StatusBarViewProps extends StatusBarProperties {
    backgroundColor?: string;
    barStyle?: 'default' | 'light-content';
}

export interface State {
}

export default class StatusBarViewWeb extends BaseComponent<StatusBarViewProps,
    State> {

    render() {
        return null;

        // let { backgroundColor, barStyle, ...props } = this.props;
        // return <View style={[styles.container, { backgroundColor }]} {...props} />;
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                height: 20
            } as ViewStyle
        };
    }
}
