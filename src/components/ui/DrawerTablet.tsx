import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import View from './View';
import { DrawerProps } from './Drawer';

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
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1
  } as ViewStyle,
  left: {
    backgroundColor: '#fff',
    // borderRightColor: '#f1f1f1',
    // borderRightWidth: 1,
    zIndex: 2,
    elevation: 2,
    shadowColor: 'rgb(76,84,128)',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    }
  } as ViewStyle,
  right: {
    backgroundColor: '#fff',
    flex: 1,
    zIndex: 1
  } as ViewStyle
});
