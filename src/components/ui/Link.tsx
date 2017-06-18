import * as React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProperties,
  ViewStyle
} from 'react-native';
import Text from './Text';
import Loading from './Loading';
import Icon from './Icon';
import Touchable, { TouchableProps } from './Touchable';
import View from './View';

export interface LinkProps extends TouchableProps {
  title?: string;
  isLoading?: boolean;
  icon?: string;
  iconSize?: number;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export interface State {}

export default class Link extends React.Component<LinkProps, State> {
  render() {
    let {
      children,
      iconStyle,
      icon,
      iconSize,
      style,
      isLoading,
      textStyle,
      title,
      ...props
    } = this.props;
    let finalIconSize = iconSize || 20;
    return (
      <Touchable style={[style]} {...props}>
        <View style={styles.content}>
          {isLoading &&
            <Loading style={styles.icon} inverted size={finalIconSize} />}
          {icon &&
            !isLoading &&
            <Icon
              style={[styles.icon, iconStyle]}
              name={icon}
              size={finalIconSize}
            />}
          {title && <Text style={[styles.title, textStyle]}>{title}</Text>}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  } as ViewStyle,
  title: {
    color: '#444',
    fontWeight: '500',
    fontSize: 13
  } as TextStyle,
  icon: {
    marginRight: 6
  } as ViewStyle
});
