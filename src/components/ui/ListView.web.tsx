import * as React from 'react';
import {
  LayoutChangeEvent,
  ListViewProperties,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewStyle,
  StyleSheet,
  ViewStyle
} from 'react-native';
import ScrollView from './ScrollView';
import Log from '../../modules/logger/Log';
import View from './View';

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

export interface DataItem {}

export class DataSource {
  data = [];

  constructor(config: any) {
    Log.info('DataSource');
  }

  cloneWithRows(results: any) {
    this.data = results;
    return this;
  }
}

export default class ListViewWeb extends React.Component<ListViewProps, State> {
  public static DataSource: any = DataSource;

  refs: {
    [string: string]: any;
    listView: ScrollView;
  };

  refreshView() {
    this.forceUpdate();
  }

  render() {
    let {
      renderRow,
      onLayout,
      contentContainerStyle,
      style,
      renderHeader,
      dataSource,
      renderFooter
    } = this.props;

    return (
      <ScrollView
        onLayout={onLayout}
        ref='listView'
        style={[styles.container, style]}
      >

        <View style={contentContainerStyle}>
          {renderHeader}

          {dataSource &&
            dataSource.data &&
            dataSource.data.map(
              (
                rowData: any,
                sectionID: string | number,
                rowID: string | number,
                highlightRow?: boolean
              ) => {
                return (
                  <View key={sectionID}>
                    {renderRow(rowData, 0, sectionID, false)}
                  </View>
                );
              }
            )}

          {renderFooter}
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#fff',
  } as ViewStyle
});
