import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import SliderBase from 'react-native-slider';
import Theme from '../../modules/theme/Theme';

export interface SliderProps {
  trackStyle?: ViewStyle;
  style?: ViewStyle;
  value?: number;
  minimumValue?: number;
  maximumValue: number;
}

export interface State {}

export default class Slider extends React.Component<SliderProps, State> {
  render() {
    let {
      style,
      trackStyle,
      minimumValue,
      maximumValue,
      ...props
    } = this.props;

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
        minimumTrackTintColor={Theme.vars.sliderActiveColor}
        minimumValue={minimumValueFinal}
        maximumValue={maximumValueFinal}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2
  } as ViewStyle,
  track: {} as ViewStyle,
  thumb: {
    backgroundColor: Theme.vars.sliderThumbColor
  } as ViewStyle
});
