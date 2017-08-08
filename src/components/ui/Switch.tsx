import * as React from 'react';
import {Switch as SwitchBase, SwitchProperties} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface SwitchProps extends SwitchProperties {
    activeColor?: string;
}

export interface State {
}

export default class Switch extends BaseComponent<SwitchProps, State> {

    render() {
        let {activeColor, ...props} = this.props;
        const {theme, styles} = this;

        activeColor = activeColor || theme.switchTintColor;
        return (
            <SwitchBase
                tintColor={activeColor}
                thumbTintColor={theme.switchThumbTintColor}
                onTintColor={theme.switchOnTintColor}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
