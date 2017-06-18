import * as React from 'react';
import {
  StatusBar,
  StatusBarProperties,
  StyleSheet,
  ViewStyle,
  Platform
} from 'react-native';
import View from './View';

export interface StatusBarViewProps extends StatusBarProperties {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content';
}

export interface State {}

export default class StatusBarViewIOS extends React.Component<
  StatusBarViewProps,
  State
> {
  render() {
    let { backgroundColor, barStyle, ...props } = this.props;

    let backgroundColorFinal = backgroundColor || 'rgba(76,84,128,0.1)';
    let barStyleFinal = barStyle || 'default';
    return (
      <View
        style={[styles.container, { backgroundColor: backgroundColorFinal }]}
        {...props}
      >
        <StatusBar
          backgroundColor={backgroundColorFinal}
          barStyle={barStyleFinal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 20
  } as ViewStyle
});