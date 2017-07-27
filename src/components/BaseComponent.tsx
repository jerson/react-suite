import * as React from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {ThemeVars} from '../modules/theme/ThemeBuilder';
import Theme from '../modules/theme/Theme';

const PropTypes = require('prop-types');

export type Style = ViewStyle | TextStyle | ImageStyle;

export type NamedStyles<T> = { [P in keyof T]: Style };

export type ThemeCallback<T> = (theme: ThemeVars) => T;


abstract class BaseComponent<P, S> extends React.Component<P, S> {

    static contextTypes = {
        theme: PropTypes.string,
    };

    styles: any;
    theme: ThemeVars;

    constructor(props?: P, context?: any) {
        super(props, context);
        this.updateTheme(false);
    }

    updateTheme(reload: boolean) {
        this.theme = Theme.vars;
        this.styles = this.loadStyles(this.theme);
        reload && this.forceUpdate();
    }

    abstract loadStyles<T extends NamedStyles<T>>(theme: ThemeVars): T ;

    componentDidUpdate(prevProps: P, prevState: S, prevContext: any) {

        let reloadTheme = prevContext.theme !== this.context.theme;
        if (reloadTheme) {
            this.updateTheme(true);
        }

    }

}

export default BaseComponent;
