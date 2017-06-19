import * as React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
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
  iconPosition?: 'before' | 'after';
  type?: 'default' | 'primary' | 'danger' | 'warning' | 'info' | 'success';
  size?: 'default' | 'small' | 'medium' | 'large';
  onPress: () => void;
}

export interface State {}

export default class Button extends React.Component<ButtonProps, State> {
  render() {
    let {
      children,
      type,
      iconStyle,
      iconPosition,
      icon,
      size,
      style,
      isLoading,
      textStyle,
      title,
      ...props
    } = this.props;

    iconPosition = iconPosition || 'before';

    let typeContainerStyle = null;
    let typeIconColor = '';
    let typeTitleStyle = null;

    let sizeContainer = 0;
    let sizeIcon = 0;
    let sizeTitle = 0;

    switch (size) {
      case 'default':
      default:
        sizeContainer = 10;
        sizeIcon = 15;
        sizeTitle = 13;
        break;
      case 'small':
        sizeContainer = 8;
        sizeIcon = 13;
        sizeTitle = 11;
        break;
      case 'medium':
        sizeContainer = 20;
        sizeIcon = 18;
        sizeTitle = 16;
        break;
      case 'large':
        sizeContainer = 20;
        sizeIcon = 22;
        sizeTitle = 20;
        break;
    }
    switch (type) {
      case 'default':
      default:
        typeIconColor = '#999';
        break;
      case 'primary':
        typeContainerStyle = styles.containerPrimary;
        typeIconColor = '#fff';
        typeTitleStyle = styles.titlePrimary;
        break;
      case 'danger':
        typeContainerStyle = styles.containerDanger;
        typeIconColor = '#fff';
        typeTitleStyle = styles.titleDanger;
        break;
      case 'warning':
        typeContainerStyle = styles.containerWarning;
        typeIconColor = '#fff';
        typeTitleStyle = styles.titleWarning;
        break;
      case 'info':
        typeContainerStyle = styles.containerInfo;
        typeIconColor = '#fff';
        typeTitleStyle = styles.titleInfo;
        break;
      case 'success':
        typeContainerStyle = styles.containerSuccess;
        typeIconColor = '#fff';
        typeTitleStyle = styles.titleSuccess;
        break;
    }

    return (
      <Touchable
        style={[
          styles.container,
          { padding: sizeContainer },
          typeContainerStyle,
          style
        ]}
        {...props}
      >
        <View style={styles.content}>
          {iconPosition === 'before' &&
            isLoading &&
            <Loading
              style={[styles.iconBefore]}
              color={typeIconColor}
              size={sizeIcon}
            />}
          {iconPosition === 'before' &&
            icon &&
            !isLoading &&
            <Icon
              style={[styles.iconBefore, { color: typeIconColor }, iconStyle]}
              name={icon}
              size={sizeIcon}
            />}
          {title &&
            <Text
              style={[
                styles.title,
                { fontSize: sizeTitle },
                typeTitleStyle,
                textStyle
              ]}
            >
              {title}
            </Text>}
          {iconPosition === 'after' &&
            isLoading &&
            <Loading
              style={[styles.iconAfter]}
              color={typeIconColor}
              size={sizeIcon}
            />}
          {iconPosition === 'after' &&
            icon &&
            !isLoading &&
            <Icon
              style={[styles.iconAfter, { color: typeIconColor }, iconStyle]}
              name={icon}
              size={sizeIcon}
            />}
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
    justifyContent: 'center'
  } as ViewStyle,
  container: {
    backgroundColor: '#efefef',
    borderRadius: 4,
    margin: 2,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
    elevation: 1,
    shadowColor: '#d4d4d4',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  } as ViewStyle,
  containerPrimary: {
    backgroundColor: '#1b6ce8',
    shadowColor: '#1964d6'
  } as ViewStyle,
  containerDanger: {
    backgroundColor: '#e83f19',
    shadowColor: '#cf3816'
  } as ViewStyle,
  containerWarning: {
    backgroundColor: '#e86744',
    shadowColor: '#d25d3d'
  } as ViewStyle,
  containerInfo: {
    backgroundColor: '#25aeec',
    shadowColor: '#22a1da'
  } as ViewStyle,
  containerSuccess: {
    backgroundColor: '#9ee853',
    shadowColor: '#8fd24b'
  } as ViewStyle,
  title: {
    color: '#444',
    // fontWeight: '500',
    fontSize: 13
  } as TextStyle,
  titlePrimary: {
    color: '#fff'
  } as TextStyle,
  titleDanger: {
    color: '#fff'
  } as TextStyle,
  titleWarning: {
    color: '#fff'
  } as TextStyle,
  titleInfo: {
    color: '#fff'
  } as TextStyle,
  titleSuccess: {
    color: '#fff'
  } as TextStyle,
  iconBefore: {
    marginRight: 6
  } as ViewStyle,
  iconAfter: {
    marginLeft: 6
  } as ViewStyle
});
