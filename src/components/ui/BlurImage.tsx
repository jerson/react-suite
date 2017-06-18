import View from './View';
import * as React from 'react';
import { Image, ImageStyle, StyleSheet, ViewStyle } from 'react-native';
import { ImageProps } from './Image';

export interface BlurImageProps extends ImageProps {
  style?: ImageStyle;
}

export interface State {}

export default class BlurImage extends React.Component<BlurImageProps, State> {
  render() {
    let { children, style, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Image style={[styles.image, style]} {...props}>
          {children}
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    overflow: 'hidden'
  } as ViewStyle,
  image: {
    backgroundColor: 'transparent',
    filter: 'blur(14px)',
    overflow: 'hidden',
    position: 'relative',
    opacity: 0.8
  } as ImageStyle
});
