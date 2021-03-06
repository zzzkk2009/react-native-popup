/**
 * Created by zachary on 2017/3/4.
 */
import React, { cloneElement } from 'react';
import { StyleSheet } from 'react-native';
import emitter from './AppRegistryInjection';

const styles = StyleSheet.create({
  offStream: {
    position: 'absolute'
  }
});
let uid = 0;

export default class {
  constructor(element, callback) {
    Object.defineProperty(this, '_id', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: uid++
    });

    this.update(element, callback);
  };

  _offstreamElement(element) {
    return cloneElement(element, {
      style: [element.props.style, styles.offStream]
    });
  };

  _id = null;

  update(element, callback) {
    emitter.emit('siblings.update', this._id, this._offstreamElement(element), callback);
  };

  destroy(callback) {
    emitter.emit('siblings.update', this._id, null, callback);
  };
}
