import * as React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Text from './Text';
import Loading from './Loading';
import Icon from './Icon';
import Touchable, { TouchableProps } from './Touchable';
import View from './View';
import Theme from '../../modules/theme/Theme';

export interface LabelProps {
  title?: string;
  hideIcon?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'default' | 'primary' | 'danger' | 'warning' | 'info' | 'success';
  size?: 'default' | 'small' | 'medium' | 'large';

  onPress?: () => void;
}

export interface State {}

export default class Label extends React.Component<LabelProps, State> {
  render() {
    let {
      children,
      type,
      style,
      hideIcon,
      textStyle,
      size,
      title,
      ...props
    } = this.props;

    let typeContainerStyle = null;
    let typeIconColor = '';
    let typeTitleStyle = null;

    let sizeContainer = 0;
    let sizeIcon = 0;
    let sizeTitle = 0;

    switch (size) {
      case 'default':
      default:
        sizeContainer = 4;
        sizeIcon = 11;
        sizeTitle = 10;
        break;
      case 'small':
        sizeContainer = 4;
        sizeIcon = 12;
        sizeTitle = 11;
        break;
      case 'medium':
        sizeContainer = 6;
        sizeIcon = 13;
        sizeTitle = 12;
        break;
      case 'large':
        sizeContainer = 8;
        sizeIcon = 14;
        sizeTitle = 13;
        break;
    }

    switch (type) {
      case 'default':
      default:
        typeIconColor = Theme.vars.labelDefaultIconColor;
        break;
      case 'primary':
        typeContainerStyle = styles.containerPrimary;
        typeIconColor = Theme.vars.labelPrimaryIconColor;
        typeTitleStyle = styles.titlePrimary;
        break;
      case 'danger':
        typeContainerStyle = styles.containerDanger;
        typeIconColor = Theme.vars.labelDangerIconColor;
        typeTitleStyle = styles.titleDanger;
        break;
      case 'warning':
        typeContainerStyle = styles.containerWarning;
        typeIconColor = Theme.vars.labelWarningIconColor;
        typeTitleStyle = styles.titleWarning;
        break;
      case 'info':
        typeContainerStyle = styles.containerInfo;
        typeIconColor = Theme.vars.labelInfoIconColor;
        typeTitleStyle = styles.titleInfo;
        break;
      case 'success':
        typeContainerStyle = styles.containerSuccess;
        typeIconColor = Theme.vars.labelSuccessIconColor;
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

          {!hideIcon &&
            <Icon
              style={[styles.icon, { color: typeIconColor }]}
              name={'label'}
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
              {title.toUpperCase()}
            </Text>}

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
    backgroundColor: Theme.vars.labelDefaultBackgroundColor,
    borderRadius: 30,
    margin: 2,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8
  } as ViewStyle,
  containerPrimary: {
    backgroundColor: Theme.vars.labelPrimaryBackgroundColor,
    shadowColor: Theme.vars.labelPrimaryShadowColor
  } as ViewStyle,
  containerDanger: {
    backgroundColor: Theme.vars.labelDangerBackgroundColor,
    shadowColor: Theme.vars.labelDangerShadowColor
  } as ViewStyle,
  containerWarning: {
    backgroundColor: Theme.vars.labelWarningBackgroundColor,
    shadowColor: Theme.vars.labelWarningShadowColor
  } as ViewStyle,
  containerInfo: {
    backgroundColor: Theme.vars.labelInfoBackgroundColor,
    shadowColor: Theme.vars.labelInfoShadowColor
  } as ViewStyle,
  containerSuccess: {
    backgroundColor: Theme.vars.labelSuccessBackgroundColor,
    shadowColor: Theme.vars.labelSuccessShadowColor
  } as ViewStyle,
  title: {
    color: Theme.vars.labelDefaultTextColor,
    fontWeight: '500',
    fontSize: 12
  } as TextStyle,
  titlePrimary: {
    color: Theme.vars.labelPrimaryTextColor
  } as TextStyle,
  titleDanger: {
    color: Theme.vars.labelDangerTextColor
  } as TextStyle,
  titleWarning: {
    color: Theme.vars.labelSuccessTextColor
  } as TextStyle,
  titleInfo: {
    color: Theme.vars.labelSuccessTextColor
  } as TextStyle,
  titleSuccess: {
    color: Theme.vars.labelSuccessTextColor
  } as TextStyle,
  icon: {
    marginRight: 4
  } as TextStyle
});
