import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import View from './View';
import { DrawerProps } from './Drawer';
import Theme from '../../modules/theme/Theme';

const PropTypes = require('prop-types');

export interface DrawerTabletProps extends DrawerProps {
  children?: JSX.Element;
  content: JSX.Element;
  leftStyle?: ViewStyle;
  onOpenStart?: () => void;
  onCloseStart?: () => void;
}

export interface State {}

export default class DrawerTablet extends React.Component<
  DrawerTabletProps,
  State
> {
  render() {
    let { content, leftStyle, children, ...props } = this.props;

    return (
      <View ref='drawer' style={styles.container}>
        <View style={[styles.left, leftStyle]}>
          {content}
        </View>
        <View style={styles.right}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.vars.drawerBackgroundColor,
    flexDirection: 'row',
    flex: 1
  } as ViewStyle,
  left: {
    backgroundColor: Theme.vars.drawerBackgroundColor,
    zIndex: 2,
    elevation: 2,
    shadowColor: Theme.vars.drawerShadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    }
  } as ViewStyle,
  right: {
    backgroundColor: Theme.vars.drawerContentBackgroundColor,
    flex: 1,
    zIndex: 1
  } as ViewStyle
});
