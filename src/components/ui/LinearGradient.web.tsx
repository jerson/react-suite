import * as React from 'react';
import {ViewStyle} from 'react-native';
import View from './View';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface LinearGradientProps {
    style?: ViewStyle;
    colors: string[];
}

export interface State {
}

export default class LinearGradientWeb extends BaseComponent<LinearGradientProps,
    State> {
    render() {
        let {colors, style, ...props} = this.props;

        return (
            <View
                style={[{background: `linear-gradient(${colors.join(',')})`}, style]}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
