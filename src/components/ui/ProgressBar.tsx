import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import SliderBase from 'react-native-slider';

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
        minimumTrackTintColor={'blue'}
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
    // backgroundColor:'red'
  } as ViewStyle,
  track: {
    height: 4,
    borderRadius: 0,
    marginTop: -4,
    backgroundColor: '#999'
  } as ViewStyle,
  thumb: {
    width: 1,
    height: 1,
    borderWidth: 0,
    opacity: 0
  } as ViewStyle
});
