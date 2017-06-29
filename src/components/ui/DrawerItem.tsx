import * as React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import View from './View';
import Text from './Text';
import Touchable from './Touchable';
import Icon from './Icon';
import Theme from '../../modules/theme/Theme';

export interface DrawerItemProps extends ViewStyle {
  children?: JSX.Element;
  rightView?: JSX.Element;
  name: string;
  isHeader?: boolean;
  isActive?: boolean;
  icon?: string;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  nameStyle?: TextStyle;
  headerStyle?: TextStyle;
  onPress?: () => void;
}

export interface State {}

export default class DrawerItem extends React.PureComponent<
  DrawerItemProps,
  State
> {
  render() {
    let {
      style,
      name,
      rightView,
      icon,
      isActive,
      isHeader,
      onPress,
      headerStyle,
      nameStyle,
      iconStyle,
      ...props
    } = this.props;

    if (isHeader) {
      return (
        <View style={[styles.headerContainer, style]}>
          <Text style={[styles.headerLabel, headerStyle]}>
            {(name || '').toUpperCase()}
          </Text>
        </View>
      );
    }

    return (
      <Touchable onPress={onPress}>
        <View
          style={[styles.container, isActive && styles.activeContainer, style]}
        >
          {icon &&
            <Icon
              name={icon}
              style={[styles.icon, isActive && styles.activeIcon, iconStyle]}
              size={25}
            />}
          <Text
            style={[styles.label, isActive && styles.activeLabel, nameStyle]}
          >
            {name}
          </Text>

          {rightView}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 5,
    paddingLeft: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.vars.drawerItemHeaderBorderColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerLabel: {
    paddingLeft: 5,
    fontSize: 11,
    color: Theme.vars.drawerItemHeaderTextColor,
    fontWeight: '400',
    alignSelf: 'center'
  },
  activeContainer: {
    backgroundColor: Theme.vars.drawerItemActiveBackgroundColor
  },
  activeLabel: {
    color: Theme.vars.drawerItemActiveTextColor
  },
  activeIcon: {
    color: Theme.vars.drawerItemActiveIconColor
  },
  container: {
    padding: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginLeft: 13,
    fontSize: 13,
    flex: 1,
    color: Theme.vars.drawerItemTextColor,
    alignSelf: 'center'
  },
  icon: {
    marginLeft: 5,
    color: Theme.vars.drawerItemIconColor
  }
});
