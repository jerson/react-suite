import * as React from 'react';
import { RefreshControl as RefreshControlBase } from 'react-native';
import Theme from '../../modules/theme/Theme';

export interface RefreshControlProps {
  refreshing: boolean;
}

export interface State {}

export default class RefreshControl extends React.PureComponent<
  RefreshControlProps,
  State
> {
  render() {
    return (
      <RefreshControlBase
        style={{ backgroundColor: 'transparent' }}
        tintColor={Theme.vars.refreshControlTintColor}
        colors={[Theme.vars.refreshControlColor]}
        {...this.props}
      />
    );
  }
}
