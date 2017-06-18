import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProperties,
  ViewStyle
} from 'react-native';

export interface TouchableProps extends TouchableOpacityProperties {
  style?: ViewStyle;
  onPress?: () => void;
}

export interface State {}

export default class Touchable extends React.Component<TouchableProps, State> {
  render() {
    let { ...props } = this.props;
    return <TouchableOpacity {...props} />;
  }
}

const styles = StyleSheet.create({});
