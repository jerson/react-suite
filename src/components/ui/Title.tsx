import * as React from 'react';
import { StyleSheet, Text as TextBase, TextStyle } from 'react-native';
import { TextProps } from './Text';
import Theme from '../../modules/theme/Theme';

export interface TitleProps extends TextProps {
  style?: TextStyle;
  center?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large' | number;
}

export interface State {}

export default class Title extends React.PureComponent<TitleProps, State> {
  render() {
    let { style, center, size, ...props } = this.props;
    let fontSize = typeof size === 'number' ? size : 18;
    if (typeof size === 'string') {
      switch (size) {
        case 'small':
          fontSize = 16;
          break;
        case 'normal':
        default:
          fontSize = 18;
          break;
        case 'medium':
          fontSize = 20;
          break;
        case 'large':
          fontSize = 24;
          break;
      }
    }

    return (
      <TextBase
        style={[styles.container, { fontSize }, center && styles.center, style]}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  container: {
    color: Theme.vars.titleColor,
    //fontFamily: 'Roboto,Helvetica,Arial',
    fontSize: 14,
    paddingTop: 4,
    paddingBottom: 4
  } as TextStyle
});
