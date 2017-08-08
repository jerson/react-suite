import * as React from 'react';
import {RefreshControl as RefreshControlBase} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface RefreshControlProps {
    refreshing: boolean;
}

export interface State {
}

export default class RefreshControl extends BaseComponent<RefreshControlProps,
    State> {
    render() {
        const {theme} = this;

        return (
            <RefreshControlBase
                style={{backgroundColor: 'transparent'}}
                tintColor={theme.refreshControlTintColor}
                colors={[theme.refreshControlColor]}
                {...this.props}
            />
        );

    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
