import * as React from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';
import MessageItem, { Message } from './MessageItem';
import View from './View';
import Log from '../../modules/logger/Log';

export interface MessageCenterProps {
  topOffset?: number;
}

export interface State {
  messages: Message[];
}

export default class MessageCenter extends React.PureComponent<
  MessageCenterProps,
  State
> {
  static counter = 0;

  state = {
    messages: []
  };

  refs: {
    [string: string]: any;
  };

  async show(params: Message): Promise<string> {
    MessageCenter.counter++;
    if (!params.id) {
      params.id = MessageCenter.counter.toString();
    }

    let messages: Message[] = this.state.messages;
    let exist = messages.some(message => {
      return params.id === message.id;
    });

    if (!exist) {
      messages = [...messages, params];
    } else {
      messages = messages.map(message => {
        if (params.id === message.id) {
          return params;
        }
        return message;
      });
    }

    Log.info(messages.length, MessageCenter.counter);

    return new Promise<string>((resolve, reject) => {
      this.setState({ messages }, () => {
        resolve(params.id);
      });
    });
  }

  remove(id: string) {
    let messages = this.state.messages.filter((item: Message) => {
      return item.id !== id;
    });
    this.setState({ messages });
  }

  onHideItem(id: string) {
    let messageRef: MessageItem = this.refs[`message${id}`];
    if (messageRef) {
      messageRef.hide(() => {
        this.remove(id);
      });
    }
  }

  render() {
    let { messages } = this.state;
    let { topOffset } = this.props;
    let top = topOffset || 5;

    if (Platform.OS === 'ios') {
      //status bar
      top += 20;
    }

    return (
      <View style={[styles.container, { top }]}>
        <View
          style={[styles.content, Platform.OS === 'web' && styles.contentWeb]}
        >
          {messages.map((item: Message, index) => {
            return (
              <MessageItem
                key={item.id}
                ref={`message${item.id}`}
                onHide={this.onHideItem.bind(this, item.id)}
                item={item}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    zIndex: 100,
    minWidth: 200
  } as ViewStyle,
  contentWeb: {
    maxWidth: 500,
    alignSelf: 'center'
  } as ViewStyle,
  container: {
    zIndex: 100,
    elevation: 10,
    flex: 1,
    //position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    position: 'absolute',
    right: 5,
    left: 5
  } as ViewStyle
});
