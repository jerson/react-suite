import * as React from 'react';
import {Text as TextBase, TextStyle} from 'react-native';
import {TextProps} from './Text';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface TitleProps extends TextProps {
    style?: TextStyle;
    center?: boolean;
    size?: 'small' | 'normal' | 'medium' | 'large' | number;
}

export interface State {
}

export default class Title extends BaseComponent<TitleProps, State> {

    render() {
        let {style, center, size, ...props} = this.props;
        const {styles} = this;
        let fontSize = typeof size === 'number' ? size : 18;
        if (typeof size === 'string') {
            switch (size) {
                case 'small':
                    fontSize = 16;
                    break;
                case 'normal':
                default:
                    fontSize = 18;
                    break;
                case 'medium':
                    fontSize = 20;
                    break;
                case 'large':
                    fontSize = 24;
                    break;
            }
        }

        return (
            <TextBase
                style={[styles.container, {fontSize}, center && styles.center, style]}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            center: {textAlign: 'center'},
            container: {
                color: theme.titleColor,
                //fontFamily: 'Roboto,Helvetica,Arial',
                fontSize: 14,
                paddingTop: 4,
                paddingBottom: 4
            } as TextStyle
        };
    }

}
