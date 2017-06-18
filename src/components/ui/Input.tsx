import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProperties,
  TextStyle,
  ViewStyle
} from 'react-native';
import Text from './Text';
import View from './View';

export interface InputProps extends TextInputProperties {
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  useLabel?: boolean;
}

export interface State {
  value: string;
}

export default class Input extends React.Component<InputProps, State> {
  state = {
    value: ''
  };

  refs: {
    [string: string]: any;
    input: TextInput;
  };

  setValue(value: string) {
    this.setState({ value });
  }

  getValue() {
    return this.state.value;
  }

  focus() {
    this.refs.input.focus();
  }

  onChangeText(text: string) {
    this.setValue(text);
    if (typeof this.props.onChangeText === 'function') {
      this.props.onChangeText(text);
    }
  }

  componentDidMount() {
    if (this.props.defaultValue) {
      this.setValue(this.props.defaultValue);
    }
  }

  render() {
    let {
      value,
      defaultValue,
      containerStyle,
      style,
      useLabel,
      placeholder,
      ...props
    } = this.props;

    let newProps: TextInputProperties = { ...props };
    newProps.value = this.state.value;
    newProps.onChangeText = this.onChangeText.bind(this);
    if (!useLabel) {
      newProps.placeholder = placeholder;
    }

    return (
      <View style={[styles.container]}>
        {useLabel && <Text style={styles.label}>{placeholder}</Text>}
        <View style={[styles.inputContainer, containerStyle]}>
          <TextInput
            underlineColorAndroid='transparent'
            placeholderTextColor={'#444'}
            style={[styles.input, style]}
            ref='input'
            {...newProps}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 10
  } as ViewStyle,
  label: {
    color: '#999',
    textAlign: 'center',
    padding: 4
  } as TextStyle,
  inputContainer: {
    borderColor: '#f4f4f4',
    backgroundColor: '#f4f4f4',
    borderRadius: 4,
    borderWidth: 1,
    padding: 1
  } as ViewStyle,
  input: {
    height: 35,
    backgroundColor: '#f9f9f9',
    color: '#444',
    borderRadius: 4,
    fontSize: 13,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10
  } as TextStyle
});
