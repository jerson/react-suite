import Log from '../../modules/logger/Log';
import * as React from 'react';
import DrawerBase from 'react-native-drawer';
import Emitter from '../../modules/listener/Emitter';
import Screen, {Dimensions} from '../../modules/listener/Screen';
import DrawerTablet from './DrawerTablet';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

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

export default class Drawer extends BaseComponent<DrawerProps, State> {
    state = {
        isOpen: false,
        height: 0,
        width: 0
    };

    refs: {
        [string: string]: any;
    };
    onDimensionsChangeListener: any;

    handler(ratio: number) {
        let r0 = -ratio / 6;
        let r1 = 1 - ratio / 6;
        let t = [r1, r0, 0, 0, -r0, r1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        return {
            main: {
                style: {
                    transformMatrix: t
                    // opacity: 1 - ratio / 2
                }
            },
            mainOverlay: {
                zIndex: 9,
                opacity: ratio,
                cursor: 'pointer',
                backgroundColor: this.theme.drawerOverlayBackgroundColor
            }
        };
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
        this.refs.drawer && this.refs.drawer.close();
    }

    open() {
        this.refs.drawer && this.refs.drawer.open();
    }

    async componentDidMount() {
        this.onDimensionsChange(await Screen.updateDimensions());
        this.onDimensionsChangeListener = Emitter.on(
            'onDimensionsChange',
            this.onDimensionsChange.bind(this)
        );
    }

    componentWillUnmount() {
        Emitter.off(this.onDimensionsChangeListener);
    }

    onDimensionsChange(dimensions: Dimensions) {
        let {width, height} = dimensions;
        this.setState({width, height});
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
            useTabledMode,
            ...props
        } = this.props;
        const {theme, styles} = this;

        const stylesDrawer = {
            drawer: {
                backgroundColor: theme.drawerBackgroundColor,
                zIndex: 10,
                elevation: 8,
                shadowColor: theme.drawerShadowColor,
                shadowOpacity: 0.3,
                shadowRadius: 4,
                shadowOffset: {
                    height: 2,
                    width: 3
                }
                //position: Platform.OS === 'web' ? 'fixed' : 'absolute',
            },
            main: {
                backgroundColor: theme.drawerContentBackgroundColor,
                flex: 1,
                paddingLeft: 30,
                zIndex: 8
            }
        };

        let containerWidth = width || 300;
        let maxWidth = containerWidth > 360 ? 360 : containerWidth;
        maxWidth *= containerWidth < 250 ? 0.9 : 0.8;

        Log.info('maxWidth', maxWidth, containerWidth);

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
            <DrawerBase
                ref='drawer'
                type='overlay'
                tapToClose={true}
                openDrawerOffset={(viewport: any) => viewport.width - maxWidth}
                closedDrawerOffset={-30}
                styles={stylesDrawer}
                content={content}
                tweenHandler={this.handler.bind(this)}
                {...props}
            />
        );
    }

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
