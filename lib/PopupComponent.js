/**
 * Created by zachary on 2017/3/4.
 */

/**
 * Popup main
 */

import React, {
  Component,
  PropTypes
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  PixelRatio,
  Platform,
} from 'react-native';

import Popup from '../index'

class PopContent extends Component{

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.array, ]),
    btns: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {title, content, btns} = this.props;
    let btnNumber = btns.length;
    return (
      <View style={styles.tipBox}>
        { title && <View style={styles.tipTitleBox}><Text style={styles.tipTitle}>{title}</Text></View>}
        <View style={styles.tipContentBox}>
          {(() => {
            let tipContent = [];
            if(content instanceof Array){
              content.forEach((item, index, arr) => {
                if(index > 9){
                  return;
                }
                item && ( tipContent[index] = (<Text style={styles.tipContent} key={'tipContent' + index}>{item}</Text>) );
              });
            }else{
              content && ( tipContent[0] = (<Text style={styles.tipContent} key={'tipContent'}>{content}</Text>) );
            }
            return tipContent;
          })()}
        </View>
        <View style={styles.line}></View>
        <View style={[styles.btnBox, btnNumber > 2 ? {flexDirection: 'column',} : {}]}>
          {(() => {
            let btnContent = [];
            btns.forEach((btn, index,) => {
              btnContent.push(
                <TouchableOpacity style={styles.btnTextBox} onPress={btn.callback} key={'btnTextBox' + index}>
                  <Text style={[styles.btnText, btn.style]}>{btn.text}</Text>
                </TouchableOpacity>
              );
              index != btnNumber - 1 && btnContent.push( <View style={btnNumber > 2 ? styles.btnVLine : styles.btnLine} key={'btnLine' + index} /> );
            });
            return btnContent;
          })()}
        </View>
      </View>
    );
  }

};

export default class PopupComponent extends Component{

  static defaultProps = {
    isOverlay: true,
    isOverlayClickClose: true,
  };

  constructor(props, context) {

    super(props, context);

    this.state = {
      isVisible: true,
      isOverlay: this.props.isOverlay,
      isOverlayClickClose: this.props.isOverlayClickClose,
      content: ( <PopContent {...this.props}/> ),
    };

  }

  close() {
    // this.setState({
    //   isVisible: false,
    // });

    Popup.close(Popup.popup)
  }

  _renderOverlay() {
    if(this.state.isOverlay) {
      return (
        <TouchableWithoutFeedback onPress={() => {
					if(this.state.isOverlayClickClose) {
						this.close();
					}
				}}>
          <View style={styles.overlay}></View>
        </TouchableWithoutFeedback>
      );
    }
  }

  _renderContent() {
    return (
      <View style={styles.tipBoxView}>
        {this.state.content}
      </View>
    );
  }

  render() {
    let { isVisible, isOverlay, } = this.state;
    if(isVisible) {
      return (
        <View style={styles.popupContainer}>
          {this._renderOverlay()}
          {this._renderContent()}
        </View>
      );
    }
    return <View style={styles.hidden}/>;
  }

};

let screen = {
  pixel: 1 / PixelRatio.get(),
  ...Dimensions.get('window')
};
let styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width,
    height: screen.height,
    overflow: 'hidden',
    backgroundColor: 'rgba(00, 00, 00, 0)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screen.width,
    height: screen.height,
    backgroundColor: '#000',
    opacity: .5,
  },
  tipBoxView: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width - 50,
    borderRadius: 12,
  },
  tipBox: {
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTitleBox: {
    height: 30,
    width: screen.width - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
  },
  tipContentBox: {
    flexDirection: 'column',
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipContent: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    lineHeight:24,
  },
  line: {
    height: screen.pixel,
    width: screen.width - 50,
    backgroundColor: '#ddd',
  },
  btnBox: {
    width: screen.width - 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextBox: {
    flexGrow: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLine: {
    height: 50,
    width: screen.pixel,
    backgroundColor: '#ddd',
  },
  btnVLine: {
    height: screen.pixel,
    width: screen.width - 50,
    backgroundColor: '#ddd',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#149be0',
  },
  hidden: {
    position: 'absolute',
    height: 0,
    width: 0,
    top: 0,
    left: 0,
  },
});

if(Platform.OS === 'ios'){
  styles = {
    ...styles,
    tipTitle: {
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },
    tipContent: {
      fontSize: 16,
      marginTop: 3,
      marginBottom: 7,
      textAlign: 'center',
      lineHeight:24,
    },
  }
}