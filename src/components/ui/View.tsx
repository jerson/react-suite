import * as React from 'react';
import {LayoutChangeEvent, View as ViewBase, ViewProperties, ViewStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface ViewProps extends ViewProperties {
    style?: ViewStyle;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export interface State {
}

export default class View extends BaseComponent<ViewProps, State> {

    render() {
        let {style, ...props} = this.props;
        const {styles} = this;

        return <ViewBase style={[styles.container, style]} {...props} />;
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {} as ViewStyle
        };
    }
}
