import * as React from 'react';
import ListView, { ListViewProps } from './ListView';
import View from './View';
import Emitter from '../../modules/listener/Emitter';
import Screen, { Dimensions } from '../../modules/listener/Screen';
import { LayoutChangeEvent, StyleSheet, ViewStyle } from 'react-native';
import Log from '../../modules/logger/Log';

export interface FlexibleGridProps extends ListViewProps {
  itemMargin?: number;
  itemWidth: number;
}

export interface State {
  itemWidth: number;
  containerWidth: number;
  containerHeight: number;
}

export interface FlexibleGridItemStyle {
  margin: number;
  width: number;
}

export default class FlexibleGrid extends React.PureComponent<
  FlexibleGridProps,
  State
> {
  state = {
    itemWidth: 0,
    containerWidth: 0,
    containerHeight: 0
  };

  refs: {
    [string: string]: any;
    list: ListView;
  };

  private onDimensionsChangeListener: string;

  onDimensionsChange(dimensions: Dimensions) {
    let { width } = dimensions;
    let { itemWidth, itemMargin } = this.props;
    let { containerWidth } = this.state;

    if (!containerWidth) {
      return;
    }
    containerWidth = containerWidth || width;

    let cols = Math.floor(containerWidth / itemWidth);
    cols = cols < 1 ? 1 : cols;
    itemMargin = itemMargin || 0;

    let windowWidth = containerWidth - itemMargin * ((cols + 1) * 2);
    itemWidth = windowWidth / cols;

    this.setState({ itemWidth }, () => {
      this.refs.list && this.refs.list.refreshView();
    });

    Log.info(
      '[FLEXIBLE-GRID]',
      'onDimensionsChange',
      width,
      containerWidth,
      itemWidth,
      itemMargin
    );
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    Emitter.off(this.onDimensionsChangeListener);
  }

  renderRow(
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
    highlightRow?: boolean
  ) {
    let margin = this.props.itemMargin || 0;
    let width = 0;
    let { itemWidth } = this.state;
    if (itemWidth > 0) {
      width = itemWidth;
    }

    let customStyle: FlexibleGridItemStyle = { margin, width };

    return (
      <View style={customStyle}>
        {this.props.renderRow(
          rowData,
          sectionID,
          rowID,
          highlightRow,
          customStyle
        )}
      </View>
    );
  }

  refreshView() {
    this.refs.list && this.refs.list.refreshView();
  }

  onLayout(event: LayoutChangeEvent) {
    let { layout } = event.nativeEvent;
    Log.debug('[FLEXIBLE-GRID]', 'onLayout', layout);
    this.setState(
      {
        containerWidth: layout.width,
        containerHeight: layout.height
      },
      async () => {
        this.onDimensionsChange(Screen.getDimensions());
      }
    );

    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  }

  render() {
    let { renderRow, itemWidth, itemMargin, style, ...props } = this.props;
    let itemWidthState = this.state.itemWidth;

    if (!itemWidthState) {
      return <View ref='list' onLayout={this.onLayout.bind(this)} />;
    }
    return (
      <ListView
        {...props}
        ref='list'
        style={style}
        contentContainerStyle={[
          styles.list,
          { padding: this.props.itemMargin }
        ]}
        onLayout={this.onLayout.bind(this)}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  } as ViewStyle
});
