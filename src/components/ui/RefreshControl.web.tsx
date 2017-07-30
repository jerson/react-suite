import * as React from 'react';
import View from './View';
import Loading from './Loading';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface RefreshControlProps {
    refreshing: boolean;
}

export interface State {
}

export default class RefreshControlWeb extends BaseComponent<RefreshControlProps,
    State> {
    render() {
        if (!this.props.refreshing) {
            return null;
        }

        return (
            <View>
                <Loading size='small'/>
            </View>
        );
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
