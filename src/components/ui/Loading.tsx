import * as React from 'react';
import {
  ActivityIndicator as ActivityIndicatorBase,
  StyleSheet,
  ViewStyle
} from 'react-native';
import View from './View';

export interface LoadingProps {
  style?: ViewStyle;
  //inverted?: boolean;
  color?: string;
  size: 'small' | 'large' | number;
}

export interface State {}

export default class Loading extends React.Component<LoadingProps, State> {
  render() {
    let { style, color, ...props } = this.props;
    color = color || '#444';

    return (
      <View style={[styles.container]}>
        <ActivityIndicatorBase color={color} style={[style]} {...props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#fff',
  } as ViewStyle
});
