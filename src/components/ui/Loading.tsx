import * as React from 'react';
import {ActivityIndicator as ActivityIndicatorBase, ViewStyle} from 'react-native';
import View from './View';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface LoadingProps {
    style?: ViewStyle;
    //inverted?: boolean;
    color?: string;
    size: 'small' | 'large' | number;
}

export interface State {
}

export default class Loading extends BaseComponent<LoadingProps, State> {
    render() {
        let {style, color, ...props} = this.props;
        const {theme, styles} = this;

        color = color || theme.loadingColor;

        return (
            <View style={[styles.container]}>
                <ActivityIndicatorBase color={color} style={[style]} {...props} />
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
