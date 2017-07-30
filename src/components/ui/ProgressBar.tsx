import * as React from 'react';
import {ViewStyle} from 'react-native';
import SliderBase from 'react-native-slider';
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

export default class ProgressBar extends BaseComponent<ProgressBarProps,
    State> {
    render() {
        let {
            style,
            trackStyle,
            minimumValue,
            maximumValue,
            ...props
        } = this.props;
        const {styles, theme} = this;

        let minimumValueFinal = minimumValue || 0;
        let maximumValueFinal = maximumValue || 0;

        minimumValueFinal = minimumValueFinal < 0 ? 0 : minimumValueFinal;
        maximumValueFinal = maximumValueFinal < minimumValueFinal
            ? minimumValueFinal + 1
            : maximumValueFinal;

        return (
            <SliderBase
                style={[styles.container, style]}
                trackStyle={[styles.track, trackStyle]}
                thumbStyle={[styles.thumb]}
                disabled={true}
                minimumTrackTintColor={theme.progressBarActiveColor}
                minimumValue={minimumValueFinal}
                maximumValue={maximumValueFinal}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {} as ViewStyle,
            track: {} as ViewStyle,
            thumb: {
                width: 1,
                height: 1,
                borderWidth: 0,
                opacity: 0
            } as ViewStyle
        };
    }
}
