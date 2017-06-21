import * as React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Link, {LinkProps} from './Link';

export interface HeaderActionProps extends LinkProps {
    title?: string;
    onPress?: () => void;
}

export interface State {
}

export default class HeaderAction extends React.Component<HeaderActionProps,
    State> {
    render() {
        let {style, iconSize, iconStyle, ...props} = this.props;
        let iconSizeFinal = iconSize || 30;
        return (
            <Link
                style={[styles.link, style]}
                iconStyle={[styles.icon, {fontSize: iconSizeFinal}, iconStyle]}
                {...props}
            />
        );
    }
}

const styles = StyleSheet.create({
    link: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        padding: 4,
        marginLeft: 2,
        marginRight: 2
    } as ViewStyle,
    icon: {
        color: '#1b6ce8'
    } as TextStyle
});
