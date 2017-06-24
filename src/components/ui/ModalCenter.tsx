import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import ModalItem, { ConfirmModal, Modal } from './ModalItem';
import View from './View';
import { _ } from '../../modules/i18n/Translator';
import ModalActionItem, { ActionModal } from './ModalActionItem';

export interface BaseModal {
  id?: string;
}

export interface ModalCenterProps {}

export interface State {
  modals: BaseModal[];
}

export default class ModalCenter extends React.Component<
  ModalCenterProps,
  State
> {
  static counter = 0;
  state = {
    modals: []
  };
  refs: {
    [string: string]: any;
  };

  async showAction(params: ActionModal): Promise<string> {
    return this.show({
      ...params
    });
  }

  async showConfirm(params: ConfirmModal): Promise<string> {
    ModalCenter.counter++;
    let id = ModalCenter.counter.toString();
    if (params.id) {
      id = params.id;
    }

    let {
      onSuccess,
      onCancel,
      title,
      actionConfirm,
      actionCancel,
      ...extra
    } = params;

    return this.show({
      id,
      title: title || _('Are you sure?'),
      actions: [
        {
          title: actionConfirm || _('Yes'),
          onPress: () => {
            if (typeof onSuccess === 'function') {
              onSuccess();
            }
            this.onHideItem(id);
          }
        },
        {
          title: actionCancel || _('No'),
          onPress: () => {
            if (typeof onCancel === 'function') {
              onCancel();
            }
            this.onHideItem(id);
          }
        }
      ],
      ...extra
    });
  }

  async showDefault(params: Modal): Promise<string> {
    return this.show(params);
  }

  remove(id: string) {
    let modals = this.state.modals.filter((item: BaseModal) => {
      return item.id !== id;
    });
    this.setState({ modals });
  }

  onHideItem(id: string) {
    let modalRef: ModalItem = this.refs[`modal${id}`];
    if (modalRef) {
      modalRef.hide(() => {
        this.remove(id);
      });
    }
  }

  render() {
    let { modals } = this.state;

    if (modals.length < 1) {
      return null;
    }

    return (
      <View style={[styles.container]}>
        {modals.map((item: BaseModal, index) => {
          if ('onReturn' in item) {
            let itemModal = item as ActionModal;
            return (
              <ModalActionItem
                key={itemModal.id}
                ref={`modal${itemModal.id}`}
                onHide={this.onHideItem.bind(this, itemModal.id)}
                item={itemModal}
              />
            );
          } else {
            return (
              <ModalItem
                key={item.id}
                ref={`modal${item.id}`}
                onHide={this.onHideItem.bind(this, item.id)}
                item={item}
              />
            );
          }
        })}
      </View>
    );
  }

  private async show(params: BaseModal): Promise<string> {
    ModalCenter.counter++;
    if (!params.id) {
      params.id = ModalCenter.counter.toString();
    }

    let modals: BaseModal[] = this.state.modals;
    let exist = modals.some(modal => {
      return params.id === modal.id;
    });

    if (!exist) {
      modals = [...modals, params];
    } else {
      modals = modals.map(modal => {
        if (params.id === modal.id) {
          return params;
        }
        return modal;
      });
    }

    return new Promise<string>((resolve, reject) => {
      this.setState({ modals }, () => {
        resolve(params.id);
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    elevation: 10,
    justifyContent: 'center',
    //flex: 1,
    //position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  } as ViewStyle
});
