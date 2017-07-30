import * as React from 'react';
import {ViewStyle} from 'react-native';
import View from './View';
import {DrawerProps} from './Drawer';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

const PropTypes = require('prop-types');

export interface DrawerTabletProps extends DrawerProps {
    children?: JSX.Element;
    content: JSX.Element;
    leftStyle?: ViewStyle;
    onOpenStart?: () => void;
    onCloseStart?: () => void;
}

export interface State {
}

export default class DrawerTablet extends BaseComponent<DrawerTabletProps,
    State> {
    render() {
        let {content, leftStyle, children, ...props} = this.props;
        const {theme, styles} = this;

        return (
            <View ref='drawer' style={styles.container}>
                <View style={[styles.left, leftStyle]}>
                    {content}
                </View>
                <View style={styles.right}>
                    {children}
                </View>
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                backgroundColor: theme.drawerBackgroundColor,
                flexDirection: 'row',
                flex: 1
            } as ViewStyle,
            left: {
                backgroundColor: theme.drawerBackgroundColor,
                zIndex: 2,
                elevation: 2,
                shadowColor: theme.drawerShadowColor,
                shadowOpacity: 0.1,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                    width: 2
                }
            } as ViewStyle,
            right: {
                backgroundColor: theme.drawerContentBackgroundColor,
                flex: 1,
                zIndex: 1
            } as ViewStyle
        };
    }
}
