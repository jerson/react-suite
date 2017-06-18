import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import View from './View';

export interface LinearGradientProps {
  style?: ViewStyle;
  colors: string[];
}

export interface State {}

export default class LinearGradientWeb extends React.Component<
  LinearGradientProps,
  State
> {
  render() {
    let { colors, style, ...props } = this.props;

    return (
      <View
        style={[{ background: `linear-gradient(${colors.join(',')})` }, style]}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({});
