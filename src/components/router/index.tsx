import {AndroidBackButton, NativeRouter, Route, Switch} from 'react-router-native';
import * as React from 'react';

export interface Props {
    children?: JSX.Element | JSX.Element[];
}

export interface State {
}

export class Router extends React.Component<Props, State> {
    render() {
        let {children, ...props} = this.props;

        return (
            <NativeRouter {...props}>
                <AndroidBackButton>
                    {children}
                </AndroidBackButton>
            </NativeRouter>
        );
    }
}

export default {
    Router,
    Route,
    Switch
};
