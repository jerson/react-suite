import * as React from 'react';
import { DrawerLayoutAndroid } from 'react-native';
import Emitter from '../../modules/listener/Emitter';
import Screen from '../../modules/listener/Screen';

const PropTypes = require('prop-types');

export interface DrawerProps {
  children?: JSX.Element;
  content: JSX.Element;
  onOpenStart?: () => void;
  onCloseStart?: () => void;
}

export interface State {}

export default class DrawerAndroid extends React.Component<DrawerProps, State> {
  static childContextTypes = {
    drawer: PropTypes.object
  };

  state = {
    isOpen: false,
    width: 0
  };

  refs: {
    [string: string]: any;
  };
  onDimensionsChangeListener: any;

  getChildContext() {
    return {
      drawer: {
        toggle: this.toggle.bind(this),
        close: this.close.bind(this),
        isOpen: this.isOpen.bind(this)
      }
    };
  }

  componentDidMount() {
    this.onDimensionsChangeListener = Emitter.on(
      'onDimensionsChange',
      this.onDimensionsChange.bind(this)
    );
    this.onDimensionsChange();
  }

  componentWillUnmount() {
    Emitter.off(this.onDimensionsChangeListener);
  }

  onDimensionsChange() {
    this.setState({
      width: Screen.getDimensions().width
    });
  }

  isOpen() {
    return this.state.isOpen;
  }

  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  close() {
    this.refs.drawer.closeDrawer();
  }

  open() {
    this.refs.drawer.openDrawer();
  }

  onDrawerClose() {
    this.setState({ isOpen: false });
    if (this.props.onCloseStart) {
      this.props.onCloseStart();
    }
  }

  onDrawerOpen() {
    this.setState({ isOpen: true });
    if (this.props.onOpenStart) {
      this.props.onOpenStart();
    }
  }

  render() {
    let { width } = this.state;
    if (width < 1) {
      return null;
    }
    let drawerWidth = width > 360 ? 360 : width;
    drawerWidth *= width < 250 ? 0.9 : 0.8;

    let { content, children, ...props } = this.props;

    return (
      <DrawerLayoutAndroid
        ref='drawer'
        drawerWidth={drawerWidth}
        onDrawerOpen={this.onDrawerOpen.bind(this)}
        onDrawerClose={this.onDrawerClose.bind(this)}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => content}
      >
        {children}
      </DrawerLayoutAndroid>
    );
  }
}
