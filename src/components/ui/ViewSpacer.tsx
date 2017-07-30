import {ViewProps} from './View';
import * as React from 'react';
import {View as ViewBase, ViewStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface ViewSpacerProps extends ViewProps {
    style?: ViewStyle;
    spacing?: number;
}

export interface State {
}

export default class ViewSpacer extends BaseComponent<ViewSpacerProps,
    State> {

    render() {
        let {style, spacing, ...props} = this.props;
        let margin = spacing || 10;
        const {styles} = this;

        return (
            <ViewBase style={[styles.container, style, {margin}]} {...props} />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                //flex: 1
            } as ViewStyle
        };
    }
}
