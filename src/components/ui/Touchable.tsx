import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProperties, ViewStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface TouchableProps extends TouchableOpacityProperties {
    style?: ViewStyle;
    onPress?: () => void;
}

export interface State {
}

export default class Touchable extends BaseComponent<TouchableProps, State> {

    render() {
        let {...props} = this.props;

        return <TouchableOpacity {...props} />;
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }

}
