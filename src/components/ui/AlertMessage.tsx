import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import Touchable from './Touchable';
import Loading from './Loading';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface AlertMessageProps {
    title?: string;
    message?: string;
    icon?: string;
    allowClose?: boolean;
    isLoading?: boolean;
    style?: ViewStyle;
    iconStyle?: TextStyle;
    titleStyle?: TextStyle;
    textStyle?: TextStyle;
    type?: 'default' | 'primary' | 'danger' | 'warning' | 'info' | 'success';
}

export interface State {
    isVisible: boolean;
}

export default class AlertMessage extends BaseComponent<AlertMessageProps,
    State> {

    state = {
        isVisible: true
    };

    close() {
        this.setState({isVisible: false});
    }

    render() {
        let {
            message,
            isLoading,
            icon,
            allowClose,
            iconStyle,
            textStyle,
            title,
            titleStyle,
            type,
            style
        } = this.props;
        const {styles, theme} = this;

        let {isVisible} = this.state;

        if (!isVisible) {
            return null;
        }

        let typeContainerStyle = null;
        let typeIconColor = '';
        let typeTitleStyle = null;
        let typeTextStyle = null;

        switch (type) {
            case 'default':
            default:
                typeIconColor = theme.alertMessageDefaultIconColor;
                break;
            case 'primary':
                typeContainerStyle = styles.containerPrimary;
                typeIconColor = theme.alertMessagePrimaryIconColor;
                typeTextStyle = styles.textPrimary;
                typeTitleStyle = styles.titlePrimary;
                break;
            case 'danger':
                typeContainerStyle = styles.containerDanger;
                typeIconColor = theme.alertMessageDangerIconColor;
                typeTextStyle = styles.textDanger;
                typeTitleStyle = styles.titleDanger;
                break;
            case 'warning':
                typeContainerStyle = styles.containerWarning;
                typeIconColor = theme.alertMessageWarningIconColor;
                typeTextStyle = styles.textWarning;
                typeTitleStyle = styles.titleWarning;
                break;
            case 'info':
                typeContainerStyle = styles.containerInfo;
                typeIconColor = theme.alertMessageInfoIconColor;
                typeTextStyle = styles.textInfo;
                typeTitleStyle = styles.titleInfo;
                break;
            case 'success':
                typeContainerStyle = styles.containerSuccess;
                typeIconColor = theme.alertMessageSuccessIconColor;
                typeTextStyle = styles.textSuccess;
                typeTitleStyle = styles.titleSuccess;
                break;
        }
        let sizeIcon = 30;

        return (
            <View style={[styles.container, typeContainerStyle, style]}>

                {isLoading &&
                <Loading
                    style={[styles.icon]}
                    color={typeIconColor}
                    size={sizeIcon}
                />}
                {icon &&
                !isLoading &&
                <Icon
                    style={[styles.icon, {color: typeIconColor}, iconStyle]}
                    name={icon}
                    size={sizeIcon}
                />}
                <View style={styles.alert}>
                    {title &&
                    <Text style={[styles.title, typeTitleStyle, titleStyle]}>
                        {title}
                    </Text>}
                    {message &&
                    <Text style={[styles.text, typeTextStyle, textStyle]}>
                        {message}
                    </Text>}
                </View>
                {allowClose &&
                <Touchable onPress={this.close.bind(this)}>
                    <Icon
                        style={[styles.icon, {color: typeIconColor}, iconStyle]}
                        name={'close'}
                        size={15}
                    />
                </Touchable>}
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            icon: {
                marginRight: 6
            } as TextStyle,
            container: {
                marginTop: 4,
                marginBottom: 4,
                backgroundColor: theme.alertMessageDefaultBackgroundColor,
                borderRadius: 4,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center'
            } as ViewStyle,
            containerPrimary: {
                backgroundColor: theme.alertMessagePrimaryBackgroundColor
            } as ViewStyle,
            containerDanger: {
                backgroundColor: theme.alertMessageDangerBackgroundColor
            } as ViewStyle,
            containerWarning: {
                backgroundColor: theme.alertMessageWarningBackgroundColor
            } as ViewStyle,
            containerInfo: {
                backgroundColor: theme.alertMessageInfoBackgroundColor
            } as ViewStyle,
            containerSuccess: {
                backgroundColor: theme.alertMessageSuccessBackgroundColor
            } as ViewStyle,
            alert: {flex: 1} as ViewStyle,
            text: {
                fontSize: 13,
                color: theme.alertMessageDefaultTextColor
            } as TextStyle,
            textPrimary: {
                color: theme.alertMessagePrimaryTextColor
            } as TextStyle,
            textDanger: {
                color: theme.alertMessageDangerTextColor
            } as TextStyle,
            textWarning: {
                color: theme.alertMessageSuccessTextColor
            } as TextStyle,
            textInfo: {
                color: theme.alertMessageSuccessTextColor
            } as TextStyle,
            textSuccess: {
                color: theme.alertMessageSuccessTextColor
            } as TextStyle,
            title: {
                fontSize: 15,
                color: theme.alertMessageDefaultTitleColor
            } as TextStyle,
            titlePrimary: {
                color: theme.alertMessagePrimaryTitleColor
            } as TextStyle,
            titleDanger: {
                color: theme.alertMessageDangerTitleColor
            } as TextStyle,
            titleWarning: {
                color: theme.alertMessageSuccessTitleColor
            } as TextStyle,
            titleInfo: {
                color: theme.alertMessageSuccessTitleColor
            } as TextStyle,
            titleSuccess: {
                color: theme.alertMessageSuccessTitleColor
            } as TextStyle
        };
    }
}
