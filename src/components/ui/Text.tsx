import * as React from 'react';
import {
  StyleSheet,
  Text as TextBase,
  TextProperties,
  TextStyle
} from 'react-native';

export interface TextProps extends TextProperties {
  style?: TextStyle;
}

export interface State {}

export default class Text extends React.Component<TextProps, State> {
  render() {
    let { style, ...props } = this.props;

    return <TextBase style={[styles.container, style]} {...props} />;
  }
}

const styles = StyleSheet.create({
  container: {
    color: '#222',
    // fontFamily: 'Heebo',
    fontSize: 14
  } as TextStyle
});
