import * as React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native';
import View from './View';
import Text from './Text';
import Button, { ButtonProps } from './Button';
import Log from '../../modules/logger/Log';
import { BaseModal } from './ModalCenter';
import CompositeAnimation = Animated.CompositeAnimation;
import EndCallback = Animated.EndCallback;

//export type ModalType = 'default' | 'action';

export interface Modal extends BaseModal {
  title?: string | JSX.Element;
  containerStyle?: ViewStyle;
  body?: string | JSX.Element;
  autoDismiss?: number;
  actions?: ModalAction[];
  //type?: ModalType;
}

export interface ConfirmModal extends Modal {
  onSuccess: () => void;
  onCancel: () => void;
  title?: string | JSX.Element;
  actionConfirm?: string;
  actionCancel?: string;
}

export interface ModalAction extends ButtonProps {
  title: string;
  onPress: () => void;
}

export interface ModalItemProps {
  item: Modal | ConfirmModal;
  onHide: () => void;
}

export interface State {
  top: Animated.Value;
  fade: Animated.Value;
  itemHeight: number;
}

export default class ModalItem extends React.Component<ModalItemProps, State> {
  state = {
    top: new Animated.Value(-100),
    fade: new Animated.Value(0),
    itemHeight: 0
  };

  private animation: CompositeAnimation;
  private timeoutDismiss: any;

  onLayout(event: LayoutChangeEvent) {
    let itemHeight = event.nativeEvent.layout.height;
    this.setState({ itemHeight });
    Log.info('[ModalItem]', itemHeight);
  }

  show() {
    if (this.animation) {
      this.animation.stop();
    }
    requestAnimationFrame(() => {
      this.animation = Animated.parallel([
        Animated.timing(this.state.fade, {
          toValue: 1,
          duration: 600
        }),
        Animated.spring(this.state.top, {
          toValue: 0,
          friction: 8
        })
      ]);
      this.animation.start();
    });
  }

  hide(cb: EndCallback) {
    let offset = this.state.itemHeight < 1 ? 50 : this.state.itemHeight;

    if (this.animation) {
      this.animation.stop();
    }
    requestAnimationFrame(() => {
      this.animation = Animated.parallel([
        Animated.timing(this.state.fade, {
          toValue: 0,
          duration: 100
        })
      ]);
      this.animation.start(cb);
    });
  }

  componentDidMount() {
    this.show();
    this.autoDismissSetup();
  }

  componentWillUnmount() {
    if (this.animation) {
      this.animation.stop();
    }
  }

  autoDismissSetup() {
    let item = this.props.item || {};
    if (this.timeoutDismiss) {
      clearTimeout(this.timeoutDismiss);
    }

    if (item.autoDismiss) {
      this.timeoutDismiss = setTimeout(() => {
        this.props.onHide();
      }, item.autoDismiss * 1000);
    }
  }

  componentDidUpdate(prevProps: ModalItemProps, prevState: State) {
    let autoDismissReload = false;
    let item = this.props.item || {};
    let prevItem = prevProps.item || {};
    if (prevItem.autoDismiss !== item.autoDismiss) {
      autoDismissReload = true;
    }

    autoDismissReload && this.autoDismissSetup();
  }

  render() {
    let { item } = this.props;
    let { fade, top } = this.state;

    // let level = item.level || 'default';

    return (
      <View style={[styles.container, item.containerStyle]}>
        <Animated.View style={{ zIndex: 10, opacity: fade, marginTop: top }}>

          <View onLayout={this.onLayout.bind(this)} style={[styles.content]}>

            {item.title &&
              <View style={[styles.header]}>
                {typeof item.title === 'object' && item.title}
                {typeof item.title !== 'object' &&
                  <Text style={styles.title}>{item.title}</Text>}
              </View>}

            {item.body &&
              <View style={[styles.body]}>
                {typeof item.body === 'object' && item.body}
                {typeof item.body !== 'object' &&
                  <Text style={styles.bodyText}>{item.body}</Text>}
              </View>}

            {item.actions &&
              <View style={[styles.footer]}>
                {item.actions.map((action, index) => {
                  return <Button key={index} {...action} />;
                })}
              </View>}

          </View>
        </Animated.View>
        <Animated.View style={[styles.backdrop, { opacity: fade }]} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  } as ViewStyle,
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 9,
    //flex: 1,
    //position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  } as ViewStyle,
  content: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'column'
  } as ViewStyle,
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444'
  } as TextStyle,
  header: {
    padding: 20
  } as ViewStyle,
  body: {
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4'
  } as ViewStyle,
  bodyText: {
    padding: 5
  } as TextStyle,
  footer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4'
  } as ViewStyle
});
