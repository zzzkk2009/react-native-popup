/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import Popup from './cmpt'
import Popup from '@zzzkk2009/react-native-popup'
// import Popup from 'react-native-popup';

export default class PopupDemo extends Component {

  alert() {
    Popup.alert({
      content: 'hello alert',
    })

    // this.popup.alert(1, 'two', '10 messages at most')
  }

  tip() {
    Popup.tip({
      title: 'tip test',
      content: 'hello tip',
    })
  }

  confirm() {
    Popup.confirm({
      title: 'confirm test',
      content: 'hello confirm',
      ok: {
        text: 'ok',
        style: {color: 'red'},
        callback: ()=>{
          console.log('ok')
        }
      },
      cancel: {
        text: 'cancel',
        callback: ()=>{
          console.log('cancel')
        }
      }
    })
  }

  pop() {
    Popup.pop({
      title: 'pop',
      content: 'pop test',
      btns: [
        {
          text: 'btn1',
          style: {color: 'red'},
          callback: ()=>{
            console.log('btn1')
          }
        },
        {
          text: 'btn2',
          style: {color: 'green'},
          callback: ()=>{
            console.log('btn2')
          }
        },
        {
          text: 'btn3',
          style: {color: 'gray'},
          callback: ()=>{
            console.log('btn3')
          }
        }
      ]
    })
  }

  renderPopup() {
    // return (
    //   <Popup ref={popup => this.popup = popup }/>
    // )
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginBottom:30}} onPress={()=>{this.alert()}}>
          <Text style={{color:'red'}}>click me to show: Popup.alert</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:30}} onPress={()=>{this.tip()}}>
          <Text style={{color:'green'}}>click me to show: Popup.tip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:30}} onPress={()=>{this.confirm()}}>
          <Text style={{color:'blue'}}>click me to show: Popup.confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:30}} onPress={()=>{this.pop()}}>
          <Text style={{color:'orange'}}>click me to show: Popup.pop</Text>
        </TouchableOpacity>

        {this.renderPopup()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});


