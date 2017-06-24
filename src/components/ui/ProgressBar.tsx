import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import SliderBase from 'react-native-slider';
import Theme from '../../modules/theme/Theme';

export interface ProgressBarProps {
  trackStyle?: ViewStyle;
  style?: ViewStyle;
  value?: number;
  minimumValue?: number;
  maximumValue: number;
}

export interface State {}

export default class ProgressBar extends React.Component<
  ProgressBarProps,
  State
> {
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
        disabled={true}
        minimumTrackTintColor={Theme.vars.progressBarActiveColor}
        minimumValue={minimumValueFinal}
        maximumValue={maximumValueFinal}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  track: {} as ViewStyle,
  thumb: {
    width: 1,
    height: 1,
    borderWidth: 0,
    opacity: 0
  } as ViewStyle
});
