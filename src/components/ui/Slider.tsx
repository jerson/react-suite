import * as React from 'react';
import {ViewStyle} from 'react-native';
import SliderBase from 'react-native-slider';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface SliderProps {
    trackStyle?: ViewStyle;
    style?: ViewStyle;
    value?: number;
    minimumValue?: number;
    maximumValue: number;
}

export interface State {
}

export default class Slider extends BaseComponent<SliderProps, State> {

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
                minimumTrackTintColor={theme.sliderActiveColor}
                minimumValue={minimumValueFinal}
                maximumValue={maximumValueFinal}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                marginTop: 2
            } as ViewStyle,
            track: {} as ViewStyle,
            thumb: {
                backgroundColor: theme.sliderThumbColor
            } as ViewStyle
        };
    }
}
