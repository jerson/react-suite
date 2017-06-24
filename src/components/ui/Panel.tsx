import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
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
  title: string;
  onPress: () => void;
}

export interface State {}

export default class Panel extends React.Component<PanelProps, State> {
  render() {
    let { title, style, children, actions, toolbarHeight } = this.props;
    let height = toolbarHeight || 50;
    let extra = Platform.OS === 'android' && Platform.Version < 21 ? 1 : 0;
    let top = (height + extra) * -1;

    return (
      <View style={[styles.container, { marginTop: height }, style]}>
        <View>
          {children}
        </View>
        {typeof title === 'object' &&
          <View style={[styles.toolbar, { height, top }]}>
            {title}
          </View>}

        {typeof title !== 'object' &&
          <View style={[styles.toolbar, { height, top }]}>
            <Text style={[styles.title]}>
              {title}
            </Text>
          </View>}

        {actions &&
          actions.length > 0 &&
          <View style={styles.options}>
            {actions.map((item, index) => {
              return <Button key={index} {...item} />;
            })}
          </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    shadowColor: Theme.vars.panelShadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    }
  } as ViewStyle,
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.vars.panelBackgroundColor,
    alignItems: 'center'
  } as ViewStyle,
  options: {
    flexDirection: 'row'
  } as ViewStyle,
  title: {
    fontSize: 15,
    flex: 1,
    color: Theme.vars.panelTextColor
  } as TextStyle
});
