import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import Text from './Text';
import Loading from './Loading';
import Icon from './Icon';
import Touchable, {TouchableProps} from './Touchable';
import View from './View';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface ButtonProps extends TouchableProps {
    title?: string;
    isLoading?: boolean;
    icon?: string;
    style?: ViewStyle;
    iconStyle?: TextStyle;
    textStyle?: TextStyle;
    iconPosition?: 'before' | 'after';
    type?: 'default' | 'primary' | 'danger' | 'warning' | 'info' | 'success';
    size?: 'default' | 'small' | 'medium' | 'large';
    onPress: () => void;
}

export interface State {
}

export default class Button extends BaseComponent<ButtonProps, State> {
    render() {
        let {
            children,
            type,
            iconStyle,
            iconPosition,
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

        let typeContainerStyle = null;
        let typeIconColor = '';
        let typeTitleStyle = null;

        let sizeContainer = 0;
        let sizeIcon = 0;
        let sizeTitle = 0;

        switch (size) {
            case 'default':
            default:
                sizeContainer = 10;
                sizeIcon = 15;
                sizeTitle = 13;
                break;
            case 'small':
                sizeContainer = 8;
                sizeIcon = 13;
                sizeTitle = 11;
                break;
            case 'medium':
                sizeContainer = 12;
                sizeIcon = 18;
                sizeTitle = 16;
                break;
            case 'large':
                sizeContainer = 15;
                sizeIcon = 22;
                sizeTitle = 20;
                break;
        }
        switch (type) {
            case 'default':
            default:
                typeIconColor = theme.buttonDefaultIconColor;
                break;
            case 'primary':
                typeContainerStyle = styles.containerPrimary;
                typeIconColor = theme.buttonPrimaryIconColor;
                typeTitleStyle = styles.titlePrimary;
                break;
            case 'danger':
                typeContainerStyle = styles.containerDanger;
                typeIconColor = theme.buttonDangerIconColor;
                typeTitleStyle = styles.titleDanger;
                break;
            case 'warning':
                typeContainerStyle = styles.containerWarning;
                typeIconColor = theme.buttonWarningIconColor;
                typeTitleStyle = styles.titleWarning;
                break;
            case 'info':
                typeContainerStyle = styles.containerInfo;
                typeIconColor = theme.buttonInfoIconColor;
                typeTitleStyle = styles.titleInfo;
                break;
            case 'success':
                typeContainerStyle = styles.containerSuccess;
                typeIconColor = theme.buttonSuccessIconColor;
                typeTitleStyle = styles.titleSuccess;
                break;
        }

        return (
            <Touchable
                style={[
                    styles.container,
                    {padding: sizeContainer},
                    typeContainerStyle,
                    style
                ]}
                {...props}
            >
                <View style={styles.content}>
                    {iconPosition === 'before' &&
                    isLoading &&
                    <Loading
                        style={[styles.iconBefore]}
                        color={typeIconColor}
                        size={sizeIcon}
                    />}
                    {iconPosition === 'before' &&
                    icon &&
                    !isLoading &&
                    <Icon
                        style={[styles.iconBefore, {color: typeIconColor}, iconStyle]}
                        name={icon}
                        size={sizeIcon}
                    />}
                    {title &&
                    <Text
                        style={[
                            styles.title,
                            {fontSize: sizeTitle},
                            typeTitleStyle,
                            textStyle
                        ]}
                    >
                        {title}
                    </Text>}
                    {iconPosition === 'after' &&
                    isLoading &&
                    <Loading
                        style={[styles.iconAfter]}
                        color={typeIconColor}
                        size={sizeIcon}
                    />}
                    {iconPosition === 'after' &&
                    icon &&
                    !isLoading &&
                    <Icon
                        style={[styles.iconAfter, {color: typeIconColor}, iconStyle]}
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
                //flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
            } as ViewStyle,
            container: {
                backgroundColor: theme.buttonDefaultBackgroundColor,
                borderRadius: 4,
                margin: 2,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                padding: 10,
                elevation: 1,
                shadowColor: theme.buttonDefaultShadowColor,
                shadowOffset: {height: 1, width: 0},
                shadowOpacity: 0.2,
                shadowRadius: 4
            } as ViewStyle,
            containerPrimary: {
                backgroundColor: theme.buttonPrimaryBackgroundColor,
                shadowColor: theme.buttonPrimaryShadowColor
            } as ViewStyle,
            containerDanger: {
                backgroundColor: theme.buttonDangerBackgroundColor,
                shadowColor: theme.buttonDangerShadowColor
            } as ViewStyle,
            containerWarning: {
                backgroundColor: theme.buttonWarningBackgroundColor,
                shadowColor: theme.buttonWarningShadowColor
            } as ViewStyle,
            containerInfo: {
                backgroundColor: theme.buttonInfoBackgroundColor,
                shadowColor: theme.buttonInfoShadowColor
            } as ViewStyle,
            containerSuccess: {
                backgroundColor: theme.buttonSuccessBackgroundColor,
                shadowColor: theme.buttonSuccessShadowColor
            } as ViewStyle,
            title: {
                color: theme.buttonDefaultTextColor,
                // fontWeight: '500',
                fontSize: 13
            } as TextStyle,
            titlePrimary: {
                color: theme.buttonPrimaryTextColor
            } as TextStyle,
            titleDanger: {
                color: theme.buttonDangerTextColor
            } as TextStyle,
            titleWarning: {
                color: theme.buttonSuccessTextColor
            } as TextStyle,
            titleInfo: {
                color: theme.buttonSuccessTextColor
            } as TextStyle,
            titleSuccess: {
                color: theme.buttonSuccessTextColor
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
