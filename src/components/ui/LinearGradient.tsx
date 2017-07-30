import * as React from 'react';
import {ViewStyle} from 'react-native';
import LinearGradientBase from 'react-native-linear-gradient';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface LinearGradientProps {
    style?: ViewStyle;
    colors: string[];
}

export interface State {
}

export default class LinearGradient extends BaseComponent<LinearGradientProps,
    State> {
    render() {
        let {...props} = this.props;

        return <LinearGradientBase {...props} />;
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
