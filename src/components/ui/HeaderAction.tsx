import * as React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Link, { LinkProps } from './Link';
import Theme from '../../modules/theme/Theme';

export interface HeaderActionProps extends LinkProps {
  title?: string;
  onPress?: () => void;
}

export interface State {}

export default class HeaderAction extends React.Component<
  HeaderActionProps,
  State
> {
  render() {
    let { style, iconStyle, ...props } = this.props;
    return (
      <Link
        style={[styles.link, style]}
        iconStyle={[styles.icon, iconStyle]}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginLeft: 2,
    marginRight: 2
  } as ViewStyle,
  icon: {
    fontSize: 30,
    color: Theme.vars.headerActionIconColor
  } as TextStyle
});
