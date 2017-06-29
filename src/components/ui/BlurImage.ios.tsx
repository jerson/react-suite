import * as React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { BlurView } from 'react-native-blur';
import { ImageProps } from './Image';

export interface BlurImageProps extends ImageProps {
  style?: ImageStyle;
}

export interface State {}

export default class BlurImageIOS extends React.Component<
  BlurImageProps,
  State
> {
  render() {
    let { children, style, ...props } = this.props;

    return (
      <Image style={[styles.container, style]} {...props}>
        <BlurView blurType={'dark'} style={[styles.container, style]}>
          {children}
        </BlurView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  } as ImageStyle
});
