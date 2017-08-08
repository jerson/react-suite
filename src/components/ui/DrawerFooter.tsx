import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import View from './View';
import Icon from './Icon';
import Text from './Text';
import {_} from '../../modules/i18n/Translator';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface DrawerFooterProps extends ViewStyle {
    children?: JSX.Element;
    text?: string;
    icon?: string;
    style?: ViewStyle;
    iconStyle?: TextStyle;
    textStyle?: TextStyle;
}

export interface State {
}

export default class DrawerFooter extends BaseComponent<DrawerFooterProps,
    State> {
    render() {
        let {style, text, icon, iconStyle, textStyle, ...props} = this.props;
        const {theme, styles} = this;

        return (
            <View style={[styles.container, style]} {...props}>
                <View style={styles.labelContainer}>
                    {icon &&
                    <Icon name={icon} style={[styles.icon, iconStyle]} size={25}/>}
                    {typeof icon === 'undefined' &&
                    <Icon
                        name={'copyright'}
                        style={[styles.icon, iconStyle]}
                        size={25}
                    />}
                    <Text style={[styles.label, textStyle]}>
                        {text || _('{app} - All rights reserved', {app: 'React Suite'})}
                    </Text>
                </View>
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                borderTopWidth: 1,
                borderTopColor: theme.drawerFooterBorderColor,
                padding: 12,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row'
            } as ViewStyle,
            labelContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1
            } as ViewStyle,
            label: {
                textAlignVertical: 'center',
                marginLeft: 15,
                fontSize: 12,
                color: theme.drawerFooterTextColor
            } as TextStyle,
            icon: {
                marginLeft: 5,
                color: theme.drawerFooterIconColor
            } as TextStyle
        };
    }
}
