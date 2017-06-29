import * as React from 'react';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import View from './View';
import Text from './Text';
import HeaderAction, { HeaderActionProps } from './HeaderAction';
import StatusBarView from './StatusBarView';
import HeaderDrawerAction from './HeaderDrawerAction';
import Theme from '../../modules/theme/Theme';

const PropTypes = require('prop-types');

export interface HeaderProps {
  left?: HeaderActionProps | JSX.Element;
  right?: HeaderActionProps | JSX.Element;
  children?: JSX.Element;
  maxWidth?: number;
  statusBarBackgroundColor?: string;
  statusBarStyle?: 'default' | 'light-content';
  title: string | JSX.Element;
  actions?: HeaderActionProps[];
}

export interface State {}

export default class Header extends React.Component<HeaderProps, State> {
  render() {
    let {
      statusBarBackgroundColor,
      statusBarStyle,
      maxWidth,
      left,
      right,
      actions,
      title
    } = this.props;
    let maxWidthFinal = maxWidth || 900;
    let statusBarBackgroundColorFinal =
      statusBarBackgroundColor ||
      (Platform.OS === 'android'
        ? Theme.vars.statusBarViewBackgroundAndroidColor
        : Theme.vars.statusBarViewBackgroundIOSColor);
    let statusBarStyleFinal =
      statusBarStyle || (Platform.OS === 'android' ? 'default' : 'default');
    return (
      <View style={styles.container}>
        <StatusBarView
          backgroundColor={statusBarBackgroundColorFinal}
          barStyle={statusBarStyleFinal}
        />
        <View style={[styles.content]}>

          <View style={[styles.header, { maxWidth: maxWidthFinal }]}>

            {left &&
              <View style={styles.left}>
                {!('onPress' in left) && left}
                {'onPress' in left &&
                  <HeaderAction {...left as HeaderActionProps} />}
              </View>}

            {!left &&
              <View style={styles.left}>
                <HeaderDrawerAction
                  iconStyle={styles.icon}
                  style={styles.buttonMenu}
                />
              </View>}

            <View style={styles.center}>
              {typeof title === 'object' && title}
              {typeof title !== 'object' &&
                <Text style={styles.title} numberOfLines={2}>{title}</Text>}
            </View>

            {actions &&
              actions.length > 0 &&
              <View style={styles.options}>
                {actions.map((item, index) => {
                  return <HeaderAction key={index} {...item} />;
                })}
              </View>}

            {right &&
              <View style={styles.right}>
                {!('onPress' in right) && right}
                {'onPress' in right &&
                  <HeaderAction {...right as HeaderActionProps} />}
              </View>}

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonMenu: {
    padding: 10,
    paddingLeft: 15
  } as ViewStyle,
  icon: {
    color: Theme.vars.headerIconColor
  } as TextStyle,
  options: {
    flexDirection: 'row'
  } as ViewStyle,
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  } as ViewStyle,
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  } as ViewStyle,
  title: {
    fontSize: 16,
    color: Theme.vars.headerTextColor
  } as TextStyle,
  center: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1
  } as ViewStyle,
  container: {
    backgroundColor: Theme.vars.headerBackgroundColor,
    //position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    // position: 'absolute',
    zIndex: 1,
    flexDirection: 'column',

    elevation: 4,
    shadowColor: Theme.vars.headerShadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    }
  } as ViewStyle,
  content: {
    flexDirection: 'row',
    justifyContent: 'center'
  } as ViewStyle,
  header: {
    flex: 1,
    flexDirection: 'row',
    height: 60
  } as ViewStyle
});
