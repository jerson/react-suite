import * as React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
//import Icon, {IconType} from './Icon';
import Touchable from './Touchable';
import View from './View';
import {ButtonProps} from './Button';
import Image from './Image';
import Text from './Text';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface OptionItemProps extends ButtonProps {
    title: string;
    image?: string;
    icon?: string;
    //iconType?: IconType;
    onPress: () => void;
}

export interface State {
}

export default class OptionItem extends BaseComponent<OptionItemProps,
    State> {
    render() {
        let {icon, image, title, onPress} = this.props;
        const {styles} = this;

        return (
            <Touchable style={styles.button} onPress={onPress}>
                <View style={[styles.container, image && styles.containerAlter]}>

                    {image && <Image style={styles.image} source={{uri: image}}/>}
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Touchable>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            containerAlter: {
                paddingTop: 2,
                paddingBottom: 2,
                borderTopWidth: 0.5,
                borderTopColor: theme.optionItemBorderColor
            } as ViewStyle,
            container: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10
            } as ViewStyle,
            icon: {
                marginLeft: 10,
                color: theme.optionItemIconColor
            } as ViewStyle,
            image: {
                marginLeft: 10,
                width: 40,
                height: 40
            } as ViewStyle,
            title: {
                marginLeft: 10,
                fontSize: 14,
                color: theme.optionItemTextColor,
                fontWeight: '400'
            } as TextStyle,
            button: {
                flex: 1
            } as ViewStyle
        };
    }
}
