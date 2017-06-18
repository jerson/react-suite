import * as React from 'react';
import {
  StatusBar as StatusBarBase,
  StatusBarProperties,
  StyleSheet,
  ViewStyle,
  Platform
} from 'react-native';

export interface StatusBarViewProps extends StatusBarProperties {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content';
}

export interface State {}

export default class StatusBarView extends React.Component<
  StatusBarViewProps,
  State
> {
  render() {
    let { backgroundColor, barStyle, ...props } = this.props;
    let backgroundColorFinal =
      backgroundColor ||
      (Platform.OS === 'android' ? '#000' : 'rgba(76,84,128,0.1)');
    let barStyleFinal =
      barStyle || (Platform.OS === 'android' ? 'default' : 'default');

    return (
      <StatusBarBase
        barStyle={barStyleFinal}
        backgroundColor={backgroundColorFinal}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {} as ViewStyle
});
