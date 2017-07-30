import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import Text from './Text';
import Loading from './Loading';
import Icon from './Icon';
import Touchable, {TouchableProps} from './Touchable';
import View from './View';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface LinkProps extends TouchableProps {
    title?: string;
    isLoading?: boolean;
    icon?: string;
    style?: ViewStyle;
    iconStyle?: TextStyle;
    textStyle?: TextStyle;
    iconPosition?: 'before' | 'after';
    size?: 'default' | 'small' | 'medium' | 'large';
    onPress?: () => void;
}

export interface State {
}

export default class Link extends BaseComponent<LinkProps, State> {
    render() {
        let {
            children,
            iconPosition,
            iconStyle,
            icon,
            size,
            style,
            isLoading,
            textStyle,
            title,
            ...props
        } = this.props;
        const {theme, styles} = this;

        iconPosition = iconPosition || 'before';

        let sizeIcon = 0;
        let sizeTitle = 0;

        switch (size) {
            case 'default':
            default:
                sizeIcon = 15;
                sizeTitle = 13;
                break;
            case 'small':
                sizeIcon = 13;
                sizeTitle = 11;
                break;
            case 'medium':
                sizeIcon = 18;
                sizeTitle = 16;
                break;
            case 'large':
                sizeIcon = 22;
                sizeTitle = 20;
                break;
        }

        let iconColor = theme.linkIconColor;

        return (
            <Touchable style={[style]} {...props}>
                <View style={styles.content}>
                    {iconPosition === 'before' &&
                    isLoading &&
                    <Loading
                        style={styles.iconBefore}
                        color={iconColor}
                        size={sizeIcon}
                    />}
                    {iconPosition === 'before' &&
                    icon &&
                    !isLoading &&
                    <Icon
                        style={[styles.iconBefore, {color: iconColor}, iconStyle]}
                        name={icon}
                        size={sizeIcon}
                    />}
                    {title &&
                    <Text style={[styles.title, {fontSize: sizeTitle}, textStyle]}>
                        {title}
                    </Text>}

                    {iconPosition === 'after' &&
                    isLoading &&
                    <Loading
                        style={styles.iconAfter}
                        color={iconColor}
                        size={sizeIcon}
                    />}
                    {iconPosition === 'after' &&
                    icon &&
                    !isLoading &&
                    <Icon
                        style={[styles.iconAfter, {color: iconColor}, iconStyle]}
                        name={icon}
                        size={sizeIcon}
                    />}
                </View>
            </Touchable>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            content: {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
            } as ViewStyle,
            title: {
                color: theme.linkTextColor,
                fontWeight: '500',
                fontSize: 13
            } as TextStyle,
            iconBefore: {
                marginRight: 6
            } as ViewStyle,
            iconAfter: {
                marginLeft: 6
            } as ViewStyle
        };
    }

}
