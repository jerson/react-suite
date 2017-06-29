import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import View, { ViewProps } from './View';
import ScrollView from './ScrollView';

export interface ContainerProps extends ViewProps {
  maxWidth?: number;
  noScroll?: boolean;
  style?: ViewStyle;
}

export interface State {}

export default class Container extends React.PureComponent<
  ContainerProps,
  State
> {
  render() {
    let { noScroll, maxWidth, style, ...props } = this.props;
    let maxWidthFinal = maxWidth || 900;

    if (noScroll) {
      return (
        <View style={[styles.scrollViewContainer, { flex: 1 }]}>
          <View
            style={[
              styles.container,
              { flex: 1 },
              { maxWidth: maxWidthFinal },
              style
            ]}
            {...props}
          />
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View
          style={[
            styles.container,
            { flex: 1 },
            { maxWidth: maxWidthFinal },
            style
          ]}
          {...props}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  } as ViewStyle,
  container: {
    padding: 20
  } as ViewStyle
});
