import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TextStyle, ViewStyle } from 'react-native';

export type IconType = 'material';

//FIXME how to add support for this icon types in web
/*export type IconType =
    | 'material'
    | 'fontAwesome'
    | 'zocial'
    | 'ionicons'
    | 'foundation'
    | 'octicons'
    | 'entypo'
    | 'evilIcons';*/

export interface IconProps {
  type?: IconType;
  style?: TextStyle;
  size?: number;
  name: string;
}

export interface State {}

export default class Icon extends React.Component<IconProps, State> {
  render() {
    let { type, name, ...props } = this.props;
    let newName = name.replace(/_/g, '-');

    switch (type) {
      default:
      case 'material':
        return <MaterialIcons name={newName} {...props} />;
      /*case 'fontAwesome':
        return <FontAwesome name={newName} {...props} />;
      case 'zocial':
        return <Zocial name={newName} {...props} />;
      case 'ionicons':
        return <Ionicons name={newName} {...props} />;
      case 'foundation':
        return <Foundation name={newName} {...props} />;
      case 'octicons':
        return <Octicons name={newName} {...props} />;
      case 'entypo':
        return <Entypo name={newName} {...props} />;
      case 'evilIcons':
        return <EvilIcons name={newName} {...props} />;*/
    }
  }
}
