import * as React from 'react';
import {
  ScrollView as ScrollViewBase,
  ScrollViewProperties,
  ScrollViewStyle,
  StyleSheet
} from 'react-native';

export interface ScrollViewProps extends ScrollViewProperties {
  style?: ScrollViewStyle;
}

export interface State {}

export default class ScrollView extends React.Component<
  ScrollViewProps,
  State
> {
  refs: {
    [string: string]: any;
    scrollView: ScrollViewBase;
  };

  render() {
    let { style, ...props } = this.props;

    return (
      <ScrollViewBase
        ref='scrollView'
        style={[styles.container, style]}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {} as ScrollViewStyle
});
