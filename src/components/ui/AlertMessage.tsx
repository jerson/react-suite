import * as React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import View from './View';
import Text from './Text';

export interface AlertMessageProps {
  message: string;
  style?: ViewStyle;
}

export interface State {}

export default class AlertMessage extends React.Component<
  AlertMessageProps,
  State
> {
  render() {
    let { message, style } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.alert}>
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 4
  } as ViewStyle,
  alert: {
    backgroundColor: '#f4f4f4',
    borderRadius: 4
  } as ViewStyle,
  text: {
    margin: 15,
    color: '#444'
  } as TextStyle
});
