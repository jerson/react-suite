import * as React from 'react';
import {
  ActivityIndicator as ActivityIndicatorBase,
  StyleSheet,
  ViewStyle
} from 'react-native';
import View from './View';

export interface ActivityIndicatorProps {
  style?: ViewStyle;
  inverted?: boolean;
  size: 'small' | 'large' | number;
}

export interface State {}

export default class Loading extends React.Component<
  ActivityIndicatorProps,
  State
> {
  render() {
    let { style, inverted, ...props } = this.props;

    let color = '#444';
    if (inverted) {
      color = '#fff';
    }

    return (
      <View style={[styles.container, style]}>
        <ActivityIndicatorBase color={color} {...props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#fff',
  } as ViewStyle
});
