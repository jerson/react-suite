import * as React from 'react';
import { ShadowStyleIOS, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Text from './Text';
import Loading from './Loading';
import Icon from './Icon';
import Touchable, { TouchableProps } from './Touchable';
import View from './View';

export interface ButtonProps extends TouchableProps {
  title?: string;
  isLoading?: boolean;
  icon?: string;
  iconSize?: number;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}

export interface State {}

export default class Button extends React.Component<ButtonProps, State> {
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
      <Touchable style={[styles.container, styles.shadow, style]} {...props}>
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
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2
  } as ViewStyle,
  shadow: {
    shadowColor: 'rgba(0,0,0,0.7)',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4
  } as ShadowStyleIOS,
  container: {
    backgroundColor: '#1b6ce8',
    borderRadius: 4,
    margin: 2,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10
  } as ViewStyle,
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13
  } as TextStyle,
  icon: {
    marginRight: 6
  } as ViewStyle
});
