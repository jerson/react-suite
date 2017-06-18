import * as React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native';
import Touchable from './Touchable';
import View from './View';
import Text from './Text';
import Loading from './Loading';
import Log from '../../modules/logger/Log';
import CompositeAnimation = Animated.CompositeAnimation;
import EndCallback = Animated.EndCallback;

export interface Message {
  id?: string;
  title?: string;
  message?: string;
  isLoading?: boolean;
  autoDismiss?: number;
}

export interface MessageItemProps {
  item: Message;
  level?: 'info' | 'default' | 'alert' | 'warning';
  onHide: () => void;
}

export interface State {
  top: Animated.Value;
  fade: Animated.Value;
  itemHeight: number;
}

export default class MessageItem extends React.Component<
  MessageItemProps,
  State
> {
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
    Log.info('[MessageItem]', itemHeight);
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
          duration: 200
        }),
        Animated.spring(this.state.top, {
          toValue: offset * -1,
          friction: 8
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

  componentDidUpdate(prevProps: MessageItemProps, prevState: State) {
    let autoDismissReload = false;
    let item = this.props.item || {};
    let prevItem = prevProps.item || {};
    if (prevItem.message !== item.message) {
      autoDismissReload = true;
    } else if (prevItem.autoDismiss !== item.autoDismiss) {
      autoDismissReload = true;
    } else if (prevItem.isLoading !== item.isLoading) {
      autoDismissReload = true;
    }

    autoDismissReload && this.autoDismissSetup();
  }

  render() {
    let { item, onHide, level, ...props } = this.props;
    let { fade, top } = this.state;
    let levelMessage = level || 'default';

    return (
      <Animated.View style={{ opacity: fade, marginTop: top }}>
        <Touchable onLayout={this.onLayout.bind(this)} onPress={onHide}>
          <View ref='content' style={[styles.container]}>
            {item.isLoading &&
              <Loading inverted style={styles.icon} size={18} />}
            <View style={[styles.infoContainer]}>
              {item.title && <Text style={[styles.title]}>{item.title}</Text>}
              {item.message &&
                <Text style={[styles.message]}>{item.message}</Text>}
            </View>

          </View>
        </Touchable>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8abb11',
    borderRadius: 4,
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row'
  } as ViewStyle,
  icon: {
    marginRight: 5
    // color: 'red'
  } as ViewStyle,
  iconContainer: {
    justifyContent: 'center',
    marginRight: 3
  } as ViewStyle,
  infoContainer: {
    //justifyContent: 'center',
    // flexDirection: 'col',
    //alignItems: 'center',
    flex: 1
  } as ViewStyle,
  title: {
    fontSize: 11,
    color: '#fff'
  } as TextStyle,
  message: {
    fontSize: 12,
    color: '#fff'
  } as TextStyle
});
