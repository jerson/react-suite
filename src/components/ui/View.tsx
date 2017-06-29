import * as React from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  View as ViewBase,
  ViewProperties,
  ViewStyle
} from 'react-native';

export interface ViewProps extends ViewProperties {
  style?: ViewStyle;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export interface State {}

export default class View extends React.PureComponent<ViewProps, State> {
  render() {
    let { style, ...props } = this.props;

    return <ViewBase style={[styles.container, style]} {...props} />;
  }
}

const styles = StyleSheet.create({
  container: {} as ViewStyle
});
