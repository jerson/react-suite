import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import Text from './Text';
import Icon from './Icon';
import Touchable from './Touchable';
import View from './View';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface LabelProps {
    title?: string;
    hideIcon?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    type?: 'default' | 'primary' | 'danger' | 'warning' | 'info' | 'success';
    size?: 'default' | 'small' | 'medium' | 'large';

    onPress?: () => void;
}

export interface State {
}

export default class Label extends BaseComponent<LabelProps, State> {
    render() {
        let {
            children,
            type,
            style,
            hideIcon,
            textStyle,
            size,
            title,
            ...props
        } = this.props;
        const {theme, styles} = this;

        let typeContainerStyle = null;
        let typeIconColor = '';
        let typeTitleStyle = null;

        let sizeContainer = 0;
        let sizeIcon = 0;
        let sizeTitle = 0;

        switch (size) {
            case 'default':
            default:
                sizeContainer = 4;
                sizeIcon = 11;
                sizeTitle = 10;
                break;
            case 'small':
                sizeContainer = 4;
                sizeIcon = 12;
                sizeTitle = 11;
                break;
            case 'medium':
                sizeContainer = 6;
                sizeIcon = 13;
                sizeTitle = 12;
                break;
            case 'large':
                sizeContainer = 8;
                sizeIcon = 14;
                sizeTitle = 13;
                break;
        }

        switch (type) {
            case 'default':
            default:
                typeIconColor = theme.labelDefaultIconColor;
                break;
            case 'primary':
                typeContainerStyle = styles.containerPrimary;
                typeIconColor = theme.labelPrimaryIconColor;
                typeTitleStyle = styles.titlePrimary;
                break;
            case 'danger':
                typeContainerStyle = styles.containerDanger;
                typeIconColor = theme.labelDangerIconColor;
                typeTitleStyle = styles.titleDanger;
                break;
            case 'warning':
                typeContainerStyle = styles.containerWarning;
                typeIconColor = theme.labelWarningIconColor;
                typeTitleStyle = styles.titleWarning;
                break;
            case 'info':
                typeContainerStyle = styles.containerInfo;
                typeIconColor = theme.labelInfoIconColor;
                typeTitleStyle = styles.titleInfo;
                break;
            case 'success':
                typeContainerStyle = styles.containerSuccess;
                typeIconColor = theme.labelSuccessIconColor;
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

                    {!hideIcon &&
                    <Icon
                        style={[styles.icon, {color: typeIconColor}]}
                        name={'label'}
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
                        {title.toUpperCase()}
                    </Text>}

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
                backgroundColor: theme.labelDefaultBackgroundColor,
                borderRadius: 30,
                margin: 2,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                padding: 4,
                paddingLeft: 8,
                paddingRight: 8
            } as ViewStyle,
            containerPrimary: {
                backgroundColor: theme.labelPrimaryBackgroundColor
            } as ViewStyle,
            containerDanger: {
                backgroundColor: theme.labelDangerBackgroundColor
            } as ViewStyle,
            containerWarning: {
                backgroundColor: theme.labelWarningBackgroundColor
            } as ViewStyle,
            containerInfo: {
                backgroundColor: theme.labelInfoBackgroundColor
            } as ViewStyle,
            containerSuccess: {
                backgroundColor: theme.labelSuccessBackgroundColor
            } as ViewStyle,
            title: {
                color: theme.labelDefaultTextColor,
                fontWeight: '500',
                fontSize: 12
            } as TextStyle,
            titlePrimary: {
                color: theme.labelPrimaryTextColor
            } as TextStyle,
            titleDanger: {
                color: theme.labelDangerTextColor
            } as TextStyle,
            titleWarning: {
                color: theme.labelSuccessTextColor
            } as TextStyle,
            titleInfo: {
                color: theme.labelSuccessTextColor
            } as TextStyle,
            titleSuccess: {
                color: theme.labelSuccessTextColor
            } as TextStyle,
            icon: {
                marginRight: 4
            } as TextStyle
        };
    }
}
