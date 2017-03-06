/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PopupDemo from './PopupDemo'

export default class example extends Component {
  render() {
    return (
      <PopupDemo />
    );
  }
}

AppRegistry.registerComponent('example', () => example);
