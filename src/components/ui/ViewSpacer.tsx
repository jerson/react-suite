import { ViewProps } from './View';
import * as React from 'react';
import { StyleSheet, View as ViewBase, ViewStyle } from 'react-native';

export interface ViewSpacerProps extends ViewProps {
  style?: ViewStyle;
  spacing?: number;
}

export interface State {}

export default class ViewSpacer extends React.PureComponent<
  ViewSpacerProps,
  State
> {
  render() {
    let { style, spacing, ...props } = this.props;
    let margin = spacing || 10;

    return (
      <ViewBase style={[styles.container, style, { margin }]} {...props} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } as ViewStyle
});
