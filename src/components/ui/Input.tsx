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
import Theme from '../../modules/theme/Theme';

export interface InputProps extends TextInputProperties {
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  hasError?: boolean;
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
      hasError,
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
        {useLabel &&
          <Text style={[styles.label, hasError && styles.labelError]}>
            {placeholder}
          </Text>}
        <View
          style={[
            styles.inputContainer,
            hasError && styles.inputContainerError,
            containerStyle
          ]}
        >
          <TextInput
            underlineColorAndroid='transparent'
            placeholderTextColor={
              hasError
                ? Theme.vars.inputErrorPlaceholderColor
                : Theme.vars.inputPlaceholderColor
            }
            style={[styles.input, hasError && styles.inputError, style]}
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
    color: Theme.vars.inputLabelColor,
    textAlign: 'center',
    padding: 4
  } as TextStyle,
  labelError: {
    color: Theme.vars.inputErrorLabelColor
  } as TextStyle,
  inputContainer: {
    //padding: 1,
    backgroundColor: Theme.vars.inputBackgroundColor,
    borderColor: Theme.vars.inputBorderColor,
    borderWidth: 1,
    borderRadius: 4
  } as ViewStyle,
  inputContainerError: {
    backgroundColor: Theme.vars.inputErrorBackgroundColor,
    borderColor: Theme.vars.inputErrorBorderColor
  } as ViewStyle,
  input: {
    height: 35,
    backgroundColor: Theme.vars.inputBackgroundColor,
    color: Theme.vars.inputTextColor,
    borderRadius: 4,
    fontSize: 13,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10
  } as TextStyle,
  inputError: {
    backgroundColor: Theme.vars.inputErrorBackgroundColor,
    color: Theme.vars.inputErrorTextColor
  } as ViewStyle
});
