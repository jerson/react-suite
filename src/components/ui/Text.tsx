import * as React from 'react';
import {Text as TextBase, TextProperties, TextStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface TextProps extends TextProperties {
    style?: TextStyle;
}

export interface State {
}

export default class Text extends BaseComponent<TextProps, State> {

    render() {
        let {style, ...props} = this.props;
        const {styles} = this;

        return <TextBase style={[styles.container, style]} {...props} />;
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                color: theme.textColor,
                // fontFamily: 'Heebo',
                fontSize: 14
            } as TextStyle
        };
    }
}
