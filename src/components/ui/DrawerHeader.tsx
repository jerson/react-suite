import * as React from 'react';
import { ImageURISource, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import View from './View';
import Text from './Text';
import Image from './Image';

export interface DrawerHeaderProps extends ViewStyle {
  children?: JSX.Element | JSX.Element[];
  title?: string;
  logo?: ImageURISource;
  style?: ViewStyle;
  logoStyle?: TextStyle;
  titleStyle?: TextStyle;
}

export interface State {}

export default class DrawerHeader extends React.Component<
  DrawerHeaderProps,
  State
> {
  render() {
    let {
      style,
      children,
      title,
      logo,
      logoStyle,
      titleStyle,
      ...props
    } = this.props;

    return (
      <View style={[styles.container, style]} {...props}>
        {children}
        {logo &&
          <Image
            source={logo}
            resizeMode={'contain'}
            style={[styles.logoIcon, logoStyle]}
          />}
        {title && <Text style={[styles.label, titleStyle]}>{title}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    //height: 100,
    justifyContent: 'center',
    padding: 13,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
    alignItems: 'center'
  } as ViewStyle,
  logoIcon: {
    width: 150,
    height: 70,
    alignSelf: 'center'
  } as ViewStyle,
  label: {
    margin: 10,
    fontSize: 18,
    color: '#444'
  } as TextStyle
});
