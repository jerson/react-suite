import * as React from 'react';
import { Switch as SwitchBase, SwitchProperties } from 'react-native';
import Theme from '../../modules/theme/Theme';

export interface SwitchProps extends SwitchProperties {
  activeColor?: string;
}

export interface State {}

export default class Switch extends React.PureComponent<SwitchProps, State> {
  render() {
    let { activeColor, ...props } = this.props;
    activeColor = activeColor || Theme.vars.switchTintColor;
    return (
      <SwitchBase
        tintColor={activeColor}
        thumbTintColor={Theme.vars.switchThumbTintColor}
        onTintColor={Theme.vars.switchOnTintColor}
        {...props}
      />
    );
  }
}
