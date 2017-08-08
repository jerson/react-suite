import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import Link, {LinkProps} from './Link';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';
import BaseComponent from '../BaseComponent';

export interface HeaderActionProps extends LinkProps {
    title?: string;
    onPress?: () => void;
}

export interface State {
}

export default class HeaderAction extends BaseComponent<HeaderActionProps,
    State> {
    render() {
        let {style, iconStyle, ...props} = this.props;
        const {theme, styles} = this;

        return (
            <Link
                style={[styles.link, style]}
                iconStyle={[styles.icon, iconStyle]}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            link: {
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                marginLeft: 2,
                marginRight: 2
            } as ViewStyle,
            icon: {
                fontSize: 30,
                color: theme.headerActionIconColor
            } as TextStyle
        };
    }
}
