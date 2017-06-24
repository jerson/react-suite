import * as React from 'react';
import {DrawerLayoutAndroid, StyleSheet, ViewStyle} from 'react-native';
import Emitter from '../../modules/listener/Emitter';
import Screen from '../../modules/listener/Screen';
import DrawerTablet from './DrawerTablet';
import View from './View';
import Theme from '../../modules/theme/Theme';

const PropTypes = require('prop-types');

export interface DrawerProps {
    children?: JSX.Element;
    content: JSX.Element;
    tabletContent?: JSX.Element;
    useTabledMode?: boolean;
    tabledModeMinWidth?: number;
    onOpenStart?: () => void;
    onCloseStart?: () => void;
}

export interface State {
    isOpen: boolean;
    height: number;
    width: number;
}

export default class DrawerAndroid extends React.Component<DrawerProps, State> {
    static childContextTypes = {
        drawer: PropTypes.object
    };

    state = {
        isOpen: false,
        width: 0,
        height: 0
    };

    refs: {
        [string: string]: any;
    };
    onDimensionsChangeListener: any;

    getChildContext() {
        return {
            drawer: {
                toggle: this.toggle.bind(this),
                close: this.close.bind(this),
                isOpen: this.isOpen.bind(this)
            }
        };
    }

    componentDidMount() {
        this.onDimensionsChangeListener = Emitter.on(
            'onDimensionsChange',
            this.onDimensionsChange.bind(this)
        );
        this.onDimensionsChange();
    }

    componentWillUnmount() {
        Emitter.off(this.onDimensionsChangeListener);
    }

    onDimensionsChange() {
        this.setState({
            width: Screen.getDimensions().width
        });
    }

    isOpen() {
        return this.state.isOpen;
    }

    toggle() {
        if (this.state.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    close() {
        this.refs.drawer && this.refs.drawer.closeDrawer();
    }

    open() {
        this.refs.drawer && this.refs.drawer.openDrawer();
    }

    onDrawerClose() {
        this.setState({isOpen: false});
        if (this.props.onCloseStart) {
            this.props.onCloseStart();
        }
    }

    onDrawerOpen() {
        this.setState({isOpen: true});
        if (this.props.onOpenStart) {
            this.props.onOpenStart();
        }
    }

    render() {
        let {width, height} = this.state;
        if (width < 1) {
            return null;
        }

        let {
            tabledModeMinWidth,
            tabletContent,
            content,
            children,
            useTabledMode,
            ...props
        } = this.props;

        let containerWidth = width || 300;
        let maxWidth = containerWidth > 360 ? 360 : containerWidth;
        maxWidth *= containerWidth < 250 ? 0.9 : 0.8;

        let minWidthTabled = tabledModeMinWidth || 800;

        if (width > minWidthTabled && useTabledMode) {
            return (
                <DrawerTablet
                    leftStyle={{width: maxWidth}}
                    content={tabletContent ? tabletContent : content}
                    {...this.props}
                />
            );
        }

        return (
            <DrawerLayoutAndroid
                ref='drawer'
                drawerWidth={maxWidth}
                onDrawerOpen={this.onDrawerOpen.bind(this)}
                onDrawerClose={this.onDrawerClose.bind(this)}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => content}
            >
                <View style={styles.content}>
                    {children}
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: Theme.vars.drawerContentBackgroundColor
    } as ViewStyle,
});