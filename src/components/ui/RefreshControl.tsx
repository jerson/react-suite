import * as React from 'react';
import { RefreshControl as RefreshControlBase } from 'react-native';

export interface RefreshControlProps {
  refreshing: boolean;
}

export interface State {}

export default class RefreshControl extends React.Component<
  RefreshControlProps,
  State
> {
  render() {
    return (
      <RefreshControlBase
        style={{ backgroundColor: 'transparent' }}
        tintColor={'red'}
        colors={['blue']}
        {...this.props}
      />
    );
  }
}
