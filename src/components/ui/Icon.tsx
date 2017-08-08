import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextStyle} from 'react-native';
import BaseComponent from '../BaseComponent';
import {ThemeVars} from '../../modules/theme/ThemeBuilder';

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

export interface State {
}

export default class Icon extends BaseComponent<IconProps, State> {
    render() {
        let {type, name, ...props} = this.props;
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

    loadStyles(theme: ThemeVars) {
        return {};
    }
}
