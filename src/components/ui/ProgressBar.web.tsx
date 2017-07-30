import * as React from 'react';
import {ProgressBar as ProgressBarBase, ViewStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface ProgressBarProps {
    trackStyle?: ViewStyle;
    style?: ViewStyle;
    value?: number;
    minimumValue?: number;
    maximumValue: number;
}

export interface State {
}

export default class ProgressBarWeb extends BaseComponent<ProgressBarProps,
    State> {
    render() {
        let {
            style,
            trackStyle,
            minimumValue,
            maximumValue,
            value,
            ...props
        } = this.props;
        const {theme} = this;

        let progress = (value || 1) / (maximumValue || 1);

        return (
            <ProgressBarBase
                color={theme.progressBarActiveColor}
                trackColor={'transparent'}
                progress={progress}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
