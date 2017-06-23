import * as React from 'react';
import {
  LayoutChangeEvent,
  ListView as BaseListView,
  ListViewProperties,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewStyle,
  StyleSheet,
  ViewStyle
} from 'react-native';

export interface ListViewProps extends ListViewProperties {
  dataSource: any;
  renderRow: (
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
    highlightRow?: boolean,
    extra?: any
  ) => React.ReactElement<any>;
  renderHeader?: () => React.ReactElement<any>;
  renderFooter?: () => React.ReactElement<any>;
  onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
  contentContainerStyle?: ViewStyle;
  style?: ScrollViewStyle;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export interface State {}

export default class ListView extends React.Component<ListViewProps, State> {
  public static DataSource: any = BaseListView.DataSource;

  refreshView() {
    this.forceUpdate();
  }

  render() {
    let { style, ...props } = this.props;

    return <BaseListView {...props} />;
  }
}

const styles = StyleSheet.create({
  container: {} as ViewStyle
});
