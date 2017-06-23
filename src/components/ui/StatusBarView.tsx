import * as React from 'react';
import {
  StatusBar as StatusBarBase,
  StatusBarProperties,
  StyleSheet,
  ViewStyle,
  Platform
} from 'react-native';
import Theme from '../../modules/theme/Theme';

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
      (Platform.OS === 'android'
        ? Theme.vars.statusBarViewBackgroundAndroidColor
        : Theme.vars.statusBarViewBackgroundIOSColor);
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
