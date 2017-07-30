import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import View from './View';
import Text from './Text';
import Touchable from './Touchable';
import Icon from './Icon';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface DrawerItemProps extends ViewStyle {
    children?: JSX.Element;
    rightView?: JSX.Element;
    name: string;
    isHeader?: boolean;
    isActive?: boolean;
    icon?: string;
    style?: ViewStyle;
    iconStyle?: TextStyle;
    nameStyle?: TextStyle;
    headerStyle?: TextStyle;
    onPress?: () => void;
}

export interface State {
}

export default class DrawerItem extends BaseComponent<DrawerItemProps,
    State> {
    render() {
        let {
            style,
            name,
            rightView,
            icon,
            isActive,
            isHeader,
            onPress,
            headerStyle,
            nameStyle,
            iconStyle,
            ...props
        } = this.props;
        const {theme, styles} = this;

        if (isHeader) {
            return (
                <View style={[styles.headerContainer, style]}>
                    <Text style={[styles.headerLabel, headerStyle]}>
                        {(name || '').toUpperCase()}
                    </Text>
                </View>
            );
        }

        return (
            <Touchable onPress={onPress}>
                <View
                    style={[styles.container, isActive && styles.activeContainer, style]}
                >
                    {icon &&
                    <Icon
                        name={icon}
                        style={[styles.icon, isActive && styles.activeIcon, iconStyle]}
                        size={25}
                    />}
                    <Text
                        style={[styles.label, isActive && styles.activeLabel, nameStyle]}
                    >
                        {name}
                    </Text>

                    {rightView}
                </View>
            </Touchable>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            headerContainer: {
                padding: 5,
                paddingLeft: 10,
                paddingTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: theme.drawerItemHeaderBorderColor,
                flexDirection: 'row',
                alignItems: 'center'
            },
            headerLabel: {
                paddingLeft: 5,
                fontSize: 11,
                color: theme.drawerItemHeaderTextColor,
                fontWeight: '400',
                alignSelf: 'center'
            },
            activeContainer: {
                backgroundColor: theme.drawerItemActiveBackgroundColor
            },
            activeLabel: {
                color: theme.drawerItemActiveTextColor
            },
            activeIcon: {
                color: theme.drawerItemActiveIconColor
            },
            container: {
                padding: 10,
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center'
            },
            label: {
                marginLeft: 13,
                fontSize: 13,
                flex: 1,
                color: theme.drawerItemTextColor,
                alignSelf: 'center'
            },
            icon: {
                marginLeft: 5,
                color: theme.drawerItemIconColor
            }
        };
    }
}
