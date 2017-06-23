import * as React from 'react';
import {
  ProgressBar as ProgressBarBase,
  StyleSheet,
  ViewStyle
} from 'react-native';
import Theme from '../../modules/theme/Theme';

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
        color={Theme.vars.progressBarActiveColor}
        trackColor={'transparent'}
        progress={progress}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({});
