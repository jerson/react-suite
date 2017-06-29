import * as React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Button, { ButtonProps } from './Button';
import Theme from '../../modules/theme/Theme';

export interface PanelProps {
  title: string | JSX.Element;
  actions?: PanelAction[];
  toolbarHeight?: number;
  children?: JSX.Element | JSX.Element[];
  style?: ViewStyle;
}

export interface PanelAction extends ButtonProps {
  title?: string;
  onPress: () => void;
}

export interface State {}

export default class Panel extends React.Component<PanelProps, State> {
  render() {
    let { title, style, children, actions, toolbarHeight } = this.props;
    let minHeight = toolbarHeight || 50;

    return (
      <View style={[styles.container, style]}>

        {typeof title === 'object' &&
          <View style={[styles.toolbar, { minHeight }]}>
            {title}
          </View>}

        {typeof title !== 'object' &&
          <View style={[styles.toolbar, { minHeight }]}>
            <Text style={[styles.title]}>
              {title}
            </Text>

            {actions &&
              actions.length > 0 &&
              <View style={styles.options}>
                {actions.map((item, index) => {
                  return <Button key={index} {...item} />;
                })}
              </View>}

          </View>}

        <View style={styles.body}>
          {children}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // backgroundColor: 'red',

    elevation: 2,
    borderRadius: 4,
    shadowRadius: 7,
    shadowColor: Theme.vars.panelShadowColor,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2
    }
  } as ViewStyle,
  body: {
    padding: 10
  } as ViewStyle,
  toolbar: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingLeft: 10,
    paddingRight: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.vars.panelBackgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: Theme.vars.panelBorderColor,
    alignItems: 'center'
  } as ViewStyle,
  options: {
    flexDirection: 'row'
  } as ViewStyle,
  title: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
    color: Theme.vars.panelTextColor
  } as TextStyle
});
