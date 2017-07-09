import * as React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Text from './Text';
import Loading from './Loading';
import Icon from './Icon';
import Touchable, { TouchableProps } from './Touchable';
import View from './View';
import Theme from '../../modules/theme/Theme';

export interface ButtonProps extends TouchableProps {
  title?: string;
  isLoading?: boolean;
  icon?: string;
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
        sizeContainer = 12;
        sizeIcon = 18;
        sizeTitle = 16;
        break;
      case 'large':
        sizeContainer = 15;
        sizeIcon = 22;
        sizeTitle = 20;
        break;
    }
    switch (type) {
      case 'default':
      default:
        typeIconColor = Theme.vars.buttonDefaultIconColor;
        break;
      case 'primary':
        typeContainerStyle = styles.containerPrimary;
        typeIconColor = Theme.vars.buttonPrimaryIconColor;
        typeTitleStyle = styles.titlePrimary;
        break;
      case 'danger':
        typeContainerStyle = styles.containerDanger;
        typeIconColor = Theme.vars.buttonDangerIconColor;
        typeTitleStyle = styles.titleDanger;
        break;
      case 'warning':
        typeContainerStyle = styles.containerWarning;
        typeIconColor = Theme.vars.buttonWarningIconColor;
        typeTitleStyle = styles.titleWarning;
        break;
      case 'info':
        typeContainerStyle = styles.containerInfo;
        typeIconColor = Theme.vars.buttonInfoIconColor;
        typeTitleStyle = styles.titleInfo;
        break;
      case 'success':
        typeContainerStyle = styles.containerSuccess;
        typeIconColor = Theme.vars.buttonSuccessIconColor;
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
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  } as ViewStyle,
  container: {
    backgroundColor: Theme.vars.buttonDefaultBackgroundColor,
    borderRadius: 4,
    margin: 2,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
    elevation: 1,
    shadowColor: Theme.vars.buttonDefaultShadowColor,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  } as ViewStyle,
  containerPrimary: {
    backgroundColor: Theme.vars.buttonPrimaryBackgroundColor,
    shadowColor: Theme.vars.buttonPrimaryShadowColor
  } as ViewStyle,
  containerDanger: {
    backgroundColor: Theme.vars.buttonDangerBackgroundColor,
    shadowColor: Theme.vars.buttonDangerShadowColor
  } as ViewStyle,
  containerWarning: {
    backgroundColor: Theme.vars.buttonWarningBackgroundColor,
    shadowColor: Theme.vars.buttonWarningShadowColor
  } as ViewStyle,
  containerInfo: {
    backgroundColor: Theme.vars.buttonInfoBackgroundColor,
    shadowColor: Theme.vars.buttonInfoShadowColor
  } as ViewStyle,
  containerSuccess: {
    backgroundColor: Theme.vars.buttonSuccessBackgroundColor,
    shadowColor: Theme.vars.buttonSuccessShadowColor
  } as ViewStyle,
  title: {
    color: Theme.vars.buttonDefaultTextColor,
    // fontWeight: '500',
    fontSize: 13
  } as TextStyle,
  titlePrimary: {
    color: Theme.vars.buttonPrimaryTextColor
  } as TextStyle,
  titleDanger: {
    color: Theme.vars.buttonDangerTextColor
  } as TextStyle,
  titleWarning: {
    color: Theme.vars.buttonSuccessTextColor
  } as TextStyle,
  titleInfo: {
    color: Theme.vars.buttonSuccessTextColor
  } as TextStyle,
  titleSuccess: {
    color: Theme.vars.buttonSuccessTextColor
  } as TextStyle,
  iconBefore: {
    marginRight: 6
  } as ViewStyle,
  iconAfter: {
    marginLeft: 6
  } as ViewStyle
});
