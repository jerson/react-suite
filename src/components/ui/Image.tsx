import * as React from 'react';
import {
  Image as ImageBase,
  ImageProperties,
  ImageStyle,
  StyleSheet
} from 'react-native';

export interface ImageProps extends ImageProperties {
  style?: ImageStyle;
}

export interface State {}

export default class Image extends React.PureComponent<ImageProps, State> {
  render() {
    let { style, ...props } = this.props;

    return <ImageBase style={[styles.container, style]} {...props} />;
  }
}

const styles = StyleSheet.create({
  container: {} as ImageStyle
});
