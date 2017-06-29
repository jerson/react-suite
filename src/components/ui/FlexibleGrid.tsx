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

export default class FlexibleGrid extends React.Component<
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
    containerWidth = containerWidth || width;

    let cols = Math.floor(containerWidth / itemWidth);
    cols = cols < 1 ? 1 : cols;
    itemMargin = itemMargin || 0;

    let windowWidth = containerWidth - itemMargin * ((cols + 1) * 2) - 1;
    itemWidth = windowWidth / cols;

    this.setState({ itemWidth }, () => {
      this.refs.list && this.refs.list.refreshView();
    });

    Log.info(width, containerWidth, itemWidth, itemMargin);
  }

  async componentDidMount() {
    //this.refs.list.measure(async (ox, oy, width, height, px, py) => {
    //    Log.warn('measure',ox, oy, width, height, px, py)
    //});

    this.onDimensionsChange(await Screen.updateDimensions());
    this.onDimensionsChangeListener = Emitter.on(
      'onDimensionsChange',
      this.onDimensionsChange.bind(this)
    );
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
    this.setState({
      containerWidth: event.nativeEvent.layout.width,
      containerHeight: event.nativeEvent.layout.height
    });
    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  }

  render() {
    let { renderRow, itemWidth, itemMargin, style, ...props } = this.props;

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
