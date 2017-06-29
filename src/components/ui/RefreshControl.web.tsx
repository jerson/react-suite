import * as React from 'react';
import View from './View';
import Loading from './Loading';

export interface RefreshControlProps {
  refreshing: boolean;
}

export interface State {}

export default class RefreshControlWeb extends React.PureComponent<
  RefreshControlProps,
  State
> {
  render() {
    if (!this.props.refreshing) {
      return null;
    }

    return (
      <View>
        <Loading size='small' />
      </View>
    );
  }
}
