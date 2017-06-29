import * as React from 'react';
import {
  ActivityIndicator as ActivityIndicatorBase,
  StyleSheet,
  ViewStyle
} from 'react-native';
import View from './View';
import Theme from '../../modules/theme/Theme';

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
    color = color || Theme.vars.loadingColor;

    return (
      <View style={[styles.container]}>
        <ActivityIndicatorBase color={color} style={[style]} {...props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {} as ViewStyle
});
