import * as React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import View from './View';
import Icon from './Icon';
import Text from './Text';
import { _ } from '../../modules/i18n/Translator';

export interface DrawerFooterProps extends ViewStyle {
  children?: JSX.Element;
  text?: string;
  icon?: string;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  textStyle?: TextStyle;
}

export interface State {}

export default class DrawerFooter extends React.Component<
  DrawerFooterProps,
  State
> {
  render() {
    let { style, text, icon, iconStyle, textStyle, ...props } = this.props;

    return (
      <View style={[styles.container, style]} {...props}>
        <View style={styles.labelContainer}>
          {icon &&
            <Icon name={icon} style={[styles.icon, iconStyle]} size={25} />}
          {typeof icon === 'undefined' &&
            <Icon
              name={'copyright'}
              style={[styles.icon, iconStyle]}
              size={25}
            />}
          <Text style={[styles.label, textStyle]}>
            {text || _('{app} - All rights reserved', { app: 'React Suite' })}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#f9f9f9',
    padding: 12,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  } as ViewStyle,
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  } as ViewStyle,
  label: {
    textAlignVertical: 'center',
    marginLeft: 15,
    fontSize: 12,
    color: '#888'
  } as TextStyle,
  icon: {
    marginLeft: 5,
    color: '#999'
  } as TextStyle
});
