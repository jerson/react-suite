import * as React from 'react';
import {
  ProgressBar as ProgressBarBase,
  StyleSheet,
  ViewStyle
} from 'react-native';

export interface ProgressBarProps {
  trackStyle?: ViewStyle;
  style?: ViewStyle;
  value?: number;
  minimumValue?: number;
  maximumValue: number;
}

export interface State {}

export default class ProgressBarWeb extends React.Component<
  ProgressBarProps,
  State
> {
  render() {
    let {
      style,
      trackStyle,
      minimumValue,
      maximumValue,
      value,
      ...props
    } = this.props;

    let progress = (minimumValue || 1) / (maximumValue || 1);

    return (
      <ProgressBarBase
        color={'blue'}
        trackColor={'transparent'}
        progress={progress}
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
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: '#f4f4f4',
    borderColor: '#d4d4d4',
    borderWidth: 2
    // opacity:0,
  } as ViewStyle
});
