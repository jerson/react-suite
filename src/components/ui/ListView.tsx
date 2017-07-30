import * as React from 'react';
import {
    LayoutChangeEvent,
    ListView as BaseListView,
    ListViewProperties,
    MeasureOnSuccessCallback,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollViewStyle,
    ViewStyle
} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

export interface ListViewProps extends ListViewProperties {
    dataSource: any;
    renderRow: (rowData: any,
                sectionID: string | number,
                rowID: string | number,
                highlightRow?: boolean,
                extra?: any) => React.ReactElement<any>;
    renderHeader?: () => React.ReactElement<any>;
    renderFooter?: () => React.ReactElement<any>;
    onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
    contentContainerStyle?: ViewStyle;
    style?: ScrollViewStyle;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export interface State {
}

export default class ListView extends BaseComponent<ListViewProps, State> {
    public static DataSource: any = BaseListView.DataSource;

    refs: {
        [string: string]: any;
        list: BaseListView;
    };

    refreshView() {
        //FIXME no funciona del todo
        this.forceUpdate();
    }

    measure(callback: MeasureOnSuccessCallback) {
        // this.refs.list.scrollResponderInputMeasureAndScrollToKeyboard(callback);
    }

    render() {
        let {style, ...props} = this.props;

        return <BaseListView ref='list' {...props} />;
    }

    loadStyles(theme: ThemeVars) {
        return {
            container: {} as ViewStyle
        };
    }
}
