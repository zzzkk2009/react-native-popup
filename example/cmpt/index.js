/**
 * Created by zachary on 2017/3/4.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import RootSiblings from './lib/SiblingsManager';
import PopupComponent from './lib/PopupComponent';

class Popup extends Component {

  static popup = null

  static alert = (options = {}) => {
    let {content, btn} = options;

    let defaultOptions = {
      content: content || '',
      btns: [{
        text: btn && btn.text || '确认',
        style: btn && btn.style || {},
        callback: () => {
          Popup.close(Popup.popup);
          btn && typeof btn.callback === 'function' && btn.callback();
        },
      }],
    }

    Popup.popup = new RootSiblings(
      <PopupComponent
        {...defaultOptions}
      />
    )

  }

  static tip =  (options = {}) => {
    let {title, content, btn} = options;

    let defaultOptions = {
      title: title || '温馨提示',
      content: content || '',
      btns: [{
        text: btn && btn.text || '确认',
        style: btn && btn.style || {},
        callback: () => {
          Popup.close(Popup.popup);
          btn && typeof btn.callback === 'function' && btn.callback();
        },
      }],
    }

    Popup.popup = new RootSiblings(
      <PopupComponent
        {...defaultOptions}
      />
    )
  }

  static confirm = (options = {}) => {
    let {title, content, ok, cancel} = options;

    let defaultOptions = {
      title: title || '',
      content: content,
      btns: [
        {
          text: cancel && cancel.text || '取消',
          style: cancel && cancel.style,
          callback: () => {
            Popup.close(Popup.popup);
            cancel && typeof cancel.callback === 'function' && cancel.callback();
          },
        },
        {
          text: ok && ok.text || '确认',
          style: ok && ok.style,
          callback: () => {
            Popup.close(Popup.popup);
            ok && typeof ok.callback === 'function' && ok.callback();
          },
        },
      ],
    }

    Popup.popup = new RootSiblings(
      <PopupComponent
        {...defaultOptions}
      />
    )
  }

  static pop = (options = {}) => {
    let {title, content, btns} = options;
    let defaultOptions = {
      title: title || '',
      content: content,
    }

    if(btns && btns.length) {
      defaultOptions.btns = []
      btns.forEach((item)=>{
        let btn = {
          text: item.text || '按钮',
          style: item.style,
          callback: () => {
            Popup.close(Popup.popup);
            typeof item.callback === 'function' && item.callback();
          },
        }
        defaultOptions.btns.push(btn)
      })
    }

    Popup.popup = new RootSiblings(
      <PopupComponent
        {...defaultOptions}
      />
    )
  }

  static close = (popup, callback) => {
    if (popup instanceof RootSiblings) {
      popup.destroy();
    } else {
      console.warn(`Popup.close expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof popup}\` instead.`);
    }
  }

  _popup = null

  componentWillMount = () => {
    this._popup = new RootSiblings(<PopupComponent
      {...this.props}
    />)
  }

  componentWillReceiveProps = nextProps => {
    this._popup.update(<PopupComponent
      {...nextProps}
    />)
  }

  componentWillUnmount = () => {
    this._popup.destroy()
  }

  render() {
    return null
  }
}

export {
  RootSiblings as Manager
};
export default Popup