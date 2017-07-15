import * as React from 'react';
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import HeaderAction from './HeaderAction';

const PropTypes = require('prop-types');

export interface HeaderDrawerActionProps {
  style?: ViewStyle;
  iconStyle?: TextStyle;
  onPress?: () => void;
}

export interface State {
  isMain: boolean;
}

export default class HeaderDrawerAction extends React.Component<
  HeaderDrawerActionProps,
  State
> {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    drawer: PropTypes.object
  };

  state = {
    isMain: true
  };

  toggle() {
    if (this.state.isMain) {
      this.context.drawer && this.context.drawer.toggle();
    } else {
      const { history } = this.context.router;
      history.goBack();
    }
  }

  componentDidMount() {
    const { history } = this.context.router;
    if (Platform.OS !== 'web') {
      let isMain = history.index === 0;
      this.setState({ isMain });
    }
  }

  render() {
    let { ...props } = this.props;
    let { isMain } = this.state;

    if (Platform.OS !== 'web') {
      return (
        <HeaderAction
          icon={isMain ? 'menu' : 'arrow_back'}
          onPress={this.toggle.bind(this)}
          {...props}
        />
      );
    }

    return (
      <HeaderAction icon={'menu'} onPress={this.toggle.bind(this)} {...props} />
    );
  }
}

const styles = StyleSheet.create({
  icon: {} as TextStyle
});
