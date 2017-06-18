import * as React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle
} from 'react-native';
import Screen from '../../modules/listener/Screen';
import View from './View';
import Text from './Text';
import Emitter from '../../modules/listener/Emitter';
import { BaseModal } from './ModalCenter';
import Button from './Button';
import { _ } from '../../modules/i18n/Translator';
import ScrollView from './ScrollView';
import OptionItem, { OptionItemProps } from './OptionItem';
import CompositeAnimation = Animated.CompositeAnimation;
import EndCallback = Animated.EndCallback;

export interface ActionModal extends BaseModal {
  title?: string | JSX.Element;
  containerStyle?: ViewStyle;
  body?: string | JSX.Element;
  actions?: ModalActionAction[];
  actionReturn?: string;
  maxWidth?: number;
  onReturn: () => void;
}

export interface ModalActionAction extends OptionItemProps {
  title: string;
  onPress: () => void;
}

export type ModalActionItemProps = {
  item: ActionModal;
  onHide: () => void;
};

export type State = {
  fade: Animated.Value;
  bottom: Animated.Value;
  width: number;
  height: number;
  isVisible: boolean;
};

export default class ModalActionItem extends React.Component<
  ModalActionItemProps,
  State
> {
  state = {
    fade: new Animated.Value(0),
    bottom: new Animated.Value(0),
    width: Screen.getDimensions().width,
    height: Screen.getDimensions().height,
    isVisible: true
  };

  private onDimensionsChangeListener: any;

  private animation: CompositeAnimation;

  componentDidMount() {
    this.show();
  }

  onLayout(event: LayoutChangeEvent) {
    let { width, height } = event.nativeEvent.layout;
    let { item } = this.props;

    let itemWidth = item.maxWidth || 400;
    //Log.info('[ModalActionItem]', 'onLayout', width, height, itemWidth, item);
    if (width < itemWidth) {
      itemWidth = width;
    }

    this.setState({ width: itemWidth, height });
  }

  show() {
    let { height } = this.state;
    let bottom = new Animated.Value(height * -1);
    this.setState({ bottom }, () => {
      requestAnimationFrame(() => {
        this.animation = Animated.parallel([
          Animated.timing(this.state.fade, {
            toValue: 1,
            delay: 200
          }),
          Animated.timing(this.state.bottom, {
            toValue: 0
          })
        ]);
        this.animation.start();
      });
    });
  }

  componentWillUnmount() {
    Emitter.off(this.onDimensionsChangeListener);
    if (this.animation) {
      this.animation.stop();
    }
  }

  hide(cb: EndCallback) {
    if (this.animation) {
      this.animation.stop();
    }

    let { height } = this.state;

    this.animation = Animated.parallel([
      Animated.timing(this.state.fade, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(this.state.bottom, {
        toValue: height * -1,
        duration: 200
      })
    ]);
    this.animation.start(cb);
  }

  onReturn() {
    if (this.props.item.onReturn) {
      this.props.item.onReturn();
    }

    this.props.onHide();
  }

  render() {
    let { fade, bottom, width, height } = this.state;
    let { item, onHide } = this.props;
    // let maxHeight = height - 50;

    return (
      <View style={[styles.container, item.containerStyle]}>
        <Animated.View style={{ zIndex: 10, bottom, flex: 1 }}>
          <TouchableWithoutFeedback onPress={onHide}>
            <View style={[styles.container]}>
              <View
                onLayout={this.onLayout.bind(this)}
                ref='content'
                style={[styles.content, { width }]}
              >
                {item.title &&
                  <View style={[styles.header]}>
                    {typeof item.title === 'object' && item.title}
                    {typeof item.title !== 'object' &&
                      <Text style={styles.title}>
                        {item.title.toUpperCase()}
                      </Text>}
                  </View>}
                {item.body &&
                  <View style={[styles.body]}>
                    {typeof item.body === 'object' && item.body}
                    {typeof item.body !== 'object' &&
                      <Text style={styles.bodyText}>{item.body}</Text>}
                  </View>}
                {item.actions &&
                  <ScrollView
                    horizontal={false}
                    style={styles.actionsContainer}
                  >
                    {item.actions.map((option, index) => {
                      return <OptionItem {...option} key={index} />;
                    })}
                  </ScrollView>}
                <View style={[styles.footer]}>
                  {item.onReturn &&
                    <Button
                      title={item.actionReturn || _('Return')}
                      style={styles.returnButton}
                      onPress={this.onReturn.bind(this)}
                    />}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View style={[styles.backdrop, { opacity: fade }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  returnButton: {
    flex: 1
  },
  actionsContainer: {
    marginBottom: 10
  },
  container: {
    zIndex: 10,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
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

  footer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4'
  } as ViewStyle,
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000'
  } as ViewStyle,
  title: {
    fontSize: 12,
    textAlign: 'center',
    color: '#444',
    margin: 10,
    fontWeight: '500'
  } as TextStyle,
  header: {} as ViewStyle,
  body: {
    padding: 5,
    paddingTop: 0,
    flexShrink: 1
    //flex:1,
  } as ViewStyle,

  bodyText: {
    padding: 5
  } as TextStyle,
  content: {
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  } as ViewStyle
});