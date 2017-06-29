import View from './View';
/**
 * @flow
 */
import * as React from 'react';
import {
  findNodeHandle,
  Image,
  ImageStyle,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { BlurView } from 'react-native-blur';
import { ImageProps } from './Image';
import Theme from '../../modules/theme/Theme';

export interface BlurImageProps extends ImageProps {
  style?: ImageStyle;
}

export interface State {
  viewRef: any;
}

export default class BlurImageAndroid extends React.PureComponent<
  BlurImageProps,
  State
> {
  state = {
    viewRef: null
  };

  refs: {
    [string: string]: any;
    input: Image;
  };
  private viewRef: any;

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.refs.backgroundImage) });
  }

  render() {
    let { style, children, ...props } = this.props;
    let { viewRef } = this.state;

    return (
      <View style={[styles.container, style]}>
        <Image
          style={[styles.container, style]}
          ref={'backgroundImage'}
          onLoadEnd={this.imageLoaded.bind(this)}
          {...props}
        />
        {viewRef &&
          <BlurView
            blurRadius={2}
            downsampleFactor={10}
            overlayColor={Theme.vars.blurImageOverlayBackgroundColor}
            style={styles.blurView}
            viewRef={viewRef}
          />}

        {children}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  } as ImageStyle,
  blurView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  } as ViewStyle
});
