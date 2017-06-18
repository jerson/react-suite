import * as React from 'react';
import { StatusBarProperties, StyleSheet, ViewStyle } from 'react-native';
import View from './View';

export interface StatusBarViewProps extends StatusBarProperties {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content';
}

export interface State {}

export default class StatusBarViewWeb extends React.Component<
  StatusBarViewProps,
  State
> {
  render() {
    return null;

    // let { backgroundColor, barStyle, ...props } = this.props;
    // return <View style={[styles.container, { backgroundColor }]} {...props} />;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 20
  } as ViewStyle
});
