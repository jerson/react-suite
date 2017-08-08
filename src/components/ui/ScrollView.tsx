import * as React from 'react';
import {ScrollView as ScrollViewBase, ScrollViewProperties, ScrollViewStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface ScrollViewProps extends ScrollViewProperties {
    style?: ScrollViewStyle;
}

export interface State {
}

export default class ScrollView extends BaseComponent<ScrollViewProps,
    State> {

    refs: {
        [string: string]: any;
        scrollView: ScrollViewBase;
    };

    render() {
        let {style, ...props} = this.props;
        const {styles} = this;

        return (
            <ScrollViewBase
                ref='scrollView'
                style={[styles.container, style]}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {} as ScrollViewStyle
        };
    }
}
