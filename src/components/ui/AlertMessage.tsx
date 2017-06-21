import * as React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import View from './View';
import Text from './Text';
import Theme from '../../modules/theme/Theme';
import Icon from './Icon';
import Touchable from './Touchable';
import Loading from './Loading';

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

export default class AlertMessage extends React.Component<AlertMessageProps,
    State> {

    state = {
        isVisible: true,
    };

    close() {
        this.setState({isVisible: false});
    }

    render() {
        let {message,isLoading, icon, allowClose, iconStyle, textStyle, title, titleStyle, type, style} = this.props;
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
                typeIconColor = Theme.vars.alertMessageDefaultIconColor;
                break;
            case 'primary':
                typeContainerStyle = styles.containerPrimary;
                typeIconColor = Theme.vars.alertMessagePrimaryIconColor;
                typeTextStyle = styles.textPrimary;
                typeTitleStyle = styles.titlePrimary;
                break;
            case 'danger':
                typeContainerStyle = styles.containerDanger;
                typeIconColor = Theme.vars.alertMessageDangerIconColor;
                typeTextStyle = styles.textDanger;
                typeTitleStyle = styles.titleDanger;
                break;
            case 'warning':
                typeContainerStyle = styles.containerWarning;
                typeIconColor = Theme.vars.alertMessageWarningIconColor;
                typeTextStyle = styles.textWarning;
                typeTitleStyle = styles.titleWarning;
                break;
            case 'info':
                typeContainerStyle = styles.containerInfo;
                typeIconColor = Theme.vars.alertMessageInfoIconColor;
                typeTextStyle = styles.textInfo;
                typeTitleStyle = styles.titleInfo;
                break;
            case 'success':
                typeContainerStyle = styles.containerSuccess;
                typeIconColor = Theme.vars.alertMessageSuccessIconColor;
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
                {icon && !isLoading &&
                <Icon
                    style={[styles.icon, {color: typeIconColor}, iconStyle]}
                    name={icon}
                    size={sizeIcon}
                />}
                <View style={styles.alert}>
                    {title && <Text style={[styles.title, typeTitleStyle, titleStyle]}>{title}</Text>}
                    {message && <Text style={[styles.text, typeTextStyle, textStyle]}>{message}</Text>}
                </View>
                {allowClose &&
                <Touchable onPress={this.close.bind(this)}>
                    <Icon
                        style={[styles.icon, {color: typeIconColor}, iconStyle]}
                        name={'close'}
                        size={15}
                    />
                </Touchable>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 6
    } as TextStyle,
    container: {
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: Theme.vars.alertMessageDefaultBackgroundColor,
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    containerPrimary: {
        backgroundColor: Theme.vars.alertMessagePrimaryBackgroundColor,
    } as ViewStyle,
    containerDanger: {
        backgroundColor: Theme.vars.alertMessageDangerBackgroundColor,
    } as ViewStyle,
    containerWarning: {
        backgroundColor: Theme.vars.alertMessageWarningBackgroundColor,
    } as ViewStyle,
    containerInfo: {
        backgroundColor: Theme.vars.alertMessageInfoBackgroundColor,
    } as ViewStyle,
    containerSuccess: {
        backgroundColor: Theme.vars.alertMessageSuccessBackgroundColor,
    } as ViewStyle,
    alert: {flex: 1} as ViewStyle,
    text: {
        fontSize: 13,
        color: Theme.vars.alertMessageDefaultTextColor
    } as TextStyle,
    textPrimary: {
        color: Theme.vars.alertMessagePrimaryTextColor
    } as TextStyle,
    textDanger: {
        color: Theme.vars.alertMessageDangerTextColor
    } as TextStyle,
    textWarning: {
        color: Theme.vars.alertMessageSuccessTextColor
    } as TextStyle,
    textInfo: {
        color: Theme.vars.alertMessageSuccessTextColor
    } as TextStyle,
    textSuccess: {
        color: Theme.vars.alertMessageSuccessTextColor
    } as TextStyle,
    title: {
        fontSize: 15,
        color: Theme.vars.alertMessageDefaultTitleColor
    } as TextStyle,
    titlePrimary: {
        color: Theme.vars.alertMessagePrimaryTitleColor
    } as TextStyle,
    titleDanger: {
        color: Theme.vars.alertMessageDangerTitleColor
    } as TextStyle,
    titleWarning: {
        color: Theme.vars.alertMessageSuccessTitleColor
    } as TextStyle,
    titleInfo: {
        color: Theme.vars.alertMessageSuccessTitleColor
    } as TextStyle,
    titleSuccess: {
        color: Theme.vars.alertMessageSuccessTitleColor
    } as TextStyle,
});
