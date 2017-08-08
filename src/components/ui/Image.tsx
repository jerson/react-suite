import * as React from 'react';
import {Image as ImageBase, ImageProperties, ImageStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface ImageProps extends ImageProperties {
    style?: ImageStyle;
}

export interface State {
}

export default class Image extends BaseComponent<ImageProps, State> {
    render() {
        let {style, ...props} = this.props;
        const {theme, styles} = this;

        return <ImageBase style={[styles.container, style]} {...props} />;
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {} as ImageStyle
        };
    }
}
