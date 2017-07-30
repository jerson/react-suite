import View from './View';
import * as React from 'react';
import {Image, ImageStyle, ViewStyle} from 'react-native';
import {ImageProps} from './Image';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface BlurImageProps extends ImageProps {
    style?: ImageStyle;
}

export interface State {
}

export default class BlurImage extends BaseComponent<BlurImageProps, State> {
    render() {
        let {children, style, ...props} = this.props;
        const {styles} = this;

        return (
            <View style={[styles.container, style]}>
                <Image style={[styles.image, style]} {...props}>
                    {children}
                </Image>
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                backgroundColor: theme.blurImageBackgroundColor,
                overflow: 'hidden'
            } as ViewStyle,
            image: {
                backgroundColor: 'transparent',
                filter: 'blur(14px)',
                overflow: 'hidden',
                position: 'relative',
                opacity: 0.8
            } as ImageStyle
        };
    }
}
