import * as React from 'react';
import {Image, ImageStyle} from 'react-native';
import {BlurView} from 'react-native-blur';
import {ImageProps} from './Image';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';
import BaseComponent from '../BaseComponent';

export interface BlurImageProps extends ImageProps {
    style?: ImageStyle;
}

export interface State {
}

export default class BlurImageIOS extends BaseComponent<BlurImageProps,
    State> {
    render() {
        let {children, style, ...props} = this.props;
        const {theme, styles} = this;

        return (
            <Image style={[styles.container, style]} {...props}>
                <BlurView blurType={'dark'} style={[styles.container, style]}>
                    {children}
                </BlurView>
            </Image>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {
                backgroundColor: 'transparent'
            } as ImageStyle
        };
    }
}
