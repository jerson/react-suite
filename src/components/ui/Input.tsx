import * as React from 'react';
import {TextInput, TextInputProperties, TextStyle, ViewStyle} from 'react-native';
import Text from './Text';
import View from './View';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';
import BaseComponent from '../BaseComponent';

export interface InputProps extends TextInputProperties {
    value?: string;
    placeholder?: string;
    defaultValue?: string;
    hasError?: boolean;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    containerStyle?: ViewStyle;
    onChangeText?: (text: string) => void;
    useLabel?: boolean;
}

export interface State {
    value: string;
}

export default class Input extends BaseComponent<InputProps, State> {
    state = {
        value: ''
    };

    refs: {
        [string: string]: any;
        input: TextInput;
    };

    setValue(value: string) {
        this.setState({value});
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
            labelStyle,
            containerStyle,
            style,
            useLabel,
            placeholder,
            ...props
        } = this.props;
        const {theme, styles} = this;

        let newProps: TextInputProperties = {...props};
        newProps.value = this.state.value;
        newProps.onChangeText = this.onChangeText.bind(this);
        if (!useLabel) {
            newProps.placeholder = placeholder;
        }

        return (
            <View style={[styles.container]}>
                {useLabel &&
                <Text
                    style={[styles.label, hasError && styles.labelError, labelStyle]}
                >
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
                                ? theme.inputErrorPlaceholderColor
                                : theme.inputPlaceholderColor
                        }
                        style={[styles.input, hasError && styles.inputError, style]}
                        ref='input'
                        {...newProps}
                    />
                </View>

            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                paddingTop: 4,
                paddingBottom: 10
            } as ViewStyle,
            label: {
                color: theme.inputLabelColor,
                textAlign: 'center',
                padding: 4
            } as TextStyle,
            labelError: {
                color: theme.inputErrorLabelColor
            } as TextStyle,
            inputContainer: {
                //padding: 1,
                backgroundColor: theme.inputBackgroundColor,
                borderColor: theme.inputBorderColor,
                borderWidth: 1,
                borderRadius: 4
            } as ViewStyle,
            inputContainerError: {
                backgroundColor: theme.inputErrorBackgroundColor,
                borderColor: theme.inputErrorBorderColor
            } as ViewStyle,
            input: {
                height: 35,
                backgroundColor: theme.inputBackgroundColor,
                color: theme.inputTextColor,
                borderRadius: 4,
                fontSize: 13,
                padding: 4,
                paddingLeft: 10,
                paddingRight: 10
            } as TextStyle,
            inputError: {
                backgroundColor: theme.inputErrorBackgroundColor,
                color: theme.inputErrorTextColor
            } as ViewStyle
        };
    }
}
