import * as React from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import Icon from './Icon';
import Touchable from './Touchable';
import Emitter from '../../modules/listener/Emitter';
import Screen, { Dimensions } from '../../modules/listener/Screen';
import { _ } from '../../modules/i18n/Translator';

export interface FilterProps {
  filterMargin?: number;
  placeholder?: string;
  style?: ViewStyle;
  onSubmitEditing?: (text: string) => void;
  onChange: (text: string) => void;
}

export interface State {
  text: string;
  inputWidth: number;
}

export default class Filter extends React.PureComponent<FilterProps, State> {
  state = {
    text: '',
    inputWidth: Screen.getDimensions().width
  };

  refs: {
    [string: string]: any;
    input: TextInput;
  };

  private changeListener: any;
  private onDimensionsChangeListener: any;

  onChange(text: string = '') {
    text = text.trim();

    if (text === this.state.text) {
      return;
    }

    this.setState({ text });

    if (this.changeListener) {
      clearTimeout(this.changeListener);
    }

    this.changeListener = setTimeout(() => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(text);
      }
    }, 100);
  }

  setQuery(text: string) {
    this.setState({ text });
  }

  clean() {
    this.setState({ text: '' });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange('');
    }
  }

  onSubmitEditing(event: { nativeEvent: { text: string } }) {
    if (typeof this.props.onSubmitEditing === 'function') {
      this.props.onSubmitEditing(event.nativeEvent.text);
    }
  }

  focus() {
    this.refs.input.focus();
  }

  onDimensionsChange(dimensions: Dimensions) {
    let inputWidth = dimensions.width - (this.props.filterMargin || 0) * 2;
    this.setState({ inputWidth });
  }

  async componentDidMount() {
    this.onDimensionsChange(await Screen.updateDimensions());
    this.onDimensionsChangeListener = Emitter.on(
      'onDimensionsChange',
      this.onDimensionsChange.bind(this)
    );
  }

  componentWillUnmount() {
    Emitter.off(this.orientationListener);
  }

  render() {
    let {
      filterMargin,
      style,
      onChange,
      placeholder,
      onSubmitEditing,
      ...props
    } = this.props;
    let { inputWidth, text } = this.state;

    return (
      <View style={[styles.container, { width: inputWidth }, style]}>
        <View style={styles.inputContainer}>
          <TextInput
            ref='input'
            style={[styles.input]}
            placeholderTextColor={'#f4f4f4'}
            placeholder={placeholder || _('Filtrar')}
            returnKeyType='search'
            blurOnSubmit={true}
            onSubmitEditing={this.onSubmitEditing.bind(this)}
            onChangeText={this.onChange.bind(this)}
            value={text}
            {...props}
          />

          <View style={styles.search}>
            <Icon name='search' />
          </View>
          <View style={[styles.fixed]}>
            <Touchable
              style={styles.cleanButton}
              onPress={this.clean.bind(this)}
            >
              <View style={styles.clean}>
                <Icon name='close' />
              </View>
            </Touchable>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red'
  } as ViewStyle,
  search: {
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 6,
    paddingLeft: 4,
    position: 'absolute',
    left: 0,
    top: 0
  } as ViewStyle,
  searchIcon: {
    color: '#444',
    margin: 2
  } as ViewStyle,
  fixed: {
    position: 'absolute',
    right: 0,
    top: 0
  } as ViewStyle,
  icon: {
    color: '#fff',
    margin: 2
  } as ViewStyle,
  clean: {
    backgroundColor: '#f4f4f4',
    borderRadius: 24 / 2,
    height: 24,
    width: 24,
    overflow: 'hidden'
  } as ViewStyle,
  cleanButton: {
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6
  } as ViewStyle,
  inputContainer: {
    borderColor: '#f4f4f4',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 1
  } as ViewStyle,
  input: {
    height: 30,
    backgroundColor: 'blue',
    color: 'red',
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 30
  } as ViewStyle
});
