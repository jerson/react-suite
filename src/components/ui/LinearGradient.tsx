import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradientBase from 'react-native-linear-gradient';

export interface LinearGradientProps {
  style?: ViewStyle;
  colors: string[];
}

export interface State {}

export default class LinearGradient extends React.PureComponent<
  LinearGradientProps,
  State
> {
  render() {
    let { ...props } = this.props;

    return <LinearGradientBase {...props} />;
  }
}

const styles = StyleSheet.create({});
