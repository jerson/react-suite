import * as React from 'react';
import { Switch as SwitchBase, SwitchProperties } from 'react-native';

export interface SwitchProps extends SwitchProperties {
  activeColor?: string;
}

export interface State {}

export default class Switch extends React.Component<SwitchProps, State> {
  render() {
    let { activeColor, ...props } = this.props;
    return (
      <SwitchBase
        tintColor={activeColor}
        thumbTintColor={'#1b6ce8'}
        {...props}
      />
    );
  }
}
