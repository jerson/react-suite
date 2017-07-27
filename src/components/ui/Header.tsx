import * as React from 'react';
import {Platform, TextStyle, ViewStyle} from 'react-native';
import View from './View';
import Text from './Text';
import HeaderAction, {HeaderActionProps} from './HeaderAction';
import StatusBarView from './StatusBarView';
import HeaderDrawerAction from './HeaderDrawerAction';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';
import BaseComponent from '../BaseComponent';

const PropTypes = require('prop-types');

export interface HeaderProps {
    left?: HeaderActionProps | JSX.Element;
    right?: HeaderActionProps | JSX.Element;
    children?: JSX.Element;
    maxWidth?: number;
    statusBarBackgroundColor?: string;
    statusBarStyle?: 'default' | 'light-content';
    title: string | JSX.Element;
    actions?: HeaderActionProps[];
}

export interface State {
}

export default class Header extends BaseComponent<HeaderProps, State> {

    static contextTypes = {
        theme: PropTypes.string,
    };

    render() {

        let {
            statusBarBackgroundColor,
            statusBarStyle,
            maxWidth,
            left,
            right,
            actions,
            title
        } = this.props;

        const {styles, theme} = this;

        let maxWidthFinal = maxWidth || 900;
        let statusBarBackgroundColorFinal =
            statusBarBackgroundColor ||
            (Platform.OS === 'android'
                ? theme.statusBarViewBackgroundAndroidColor
                : theme.statusBarViewBackgroundIOSColor);
        let statusBarStyleFinal =
            statusBarStyle || (Platform.OS === 'android' ? 'default' : 'default');

        return (
            <View style={styles.container}>
                <StatusBarView
                    backgroundColor={statusBarBackgroundColorFinal}
                    barStyle={statusBarStyleFinal}
                />
                <View style={[styles.content]}>

                    <View style={[styles.header, {maxWidth: maxWidthFinal}]}>

                        {left &&
                        <View style={styles.left}>
                            {!('onPress' in left) && left}
                            {'onPress' in left &&
                            <HeaderAction {...left as HeaderActionProps} />}
                        </View>}

                        {!left &&
                        <View style={styles.left}>
                            <HeaderDrawerAction
                                iconStyle={styles.icon}
                                style={styles.buttonMenu}
                            />
                        </View>}

                        <View style={styles.center}>
                            {typeof title === 'object' && title}
                            {typeof title !== 'object' &&
                            <Text style={styles.title} numberOfLines={2}>{title}</Text>}
                        </View>

                        {actions &&
                        actions.length > 0 &&
                        <View style={styles.options}>
                            {actions.map((item, index) => {
                                return <HeaderAction key={index} {...item} />;
                            })}
                        </View>}

                        {right &&
                        <View style={styles.right}>
                            {!('onPress' in right) && right}
                            {'onPress' in right &&
                            <HeaderAction {...right as HeaderActionProps} />}
                        </View>}

                    </View>

                </View>
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            buttonMenu: {
                padding: 10,
                paddingLeft: 15
            } as ViewStyle,
            icon: {
                color: theme.headerIconColor
            } as TextStyle,
            options: {
                flexDirection: 'row'
            } as ViewStyle,
            right: {
                flexDirection: 'row',
                justifyContent: 'flex-end'
            } as ViewStyle,
            left: {
                flexDirection: 'row',
                justifyContent: 'flex-start'
            } as ViewStyle,
            title: {
                fontSize: 16,
                color: theme.headerTextColor
            } as TextStyle,
            center: {
                alignItems: 'flex-start',
                justifyContent: 'center',
                flex: 1
            } as ViewStyle,
            container: {
                backgroundColor: theme.headerBackgroundColor,
                //position: Platform.OS === 'web' ? 'fixed' : 'absolute',
                // position: 'absolute',
                zIndex: 1,
                flexDirection: 'column',

                elevation: 4,
                shadowColor: theme.headerShadowColor,
                shadowOpacity: 0.1,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                    width: 2
                }
            } as ViewStyle,
            content: {
                flexDirection: 'row',
                justifyContent: 'center'
            } as ViewStyle,
            header: {
                flex: 1,
                flexDirection: 'row',
                height: 60
            } as ViewStyle
        };
    }
}
