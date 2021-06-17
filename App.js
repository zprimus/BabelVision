/*****************************************
 * Babel Vision
 * https://github.com/zprimus/BabelVision
 * 
 * Created by: Zachary Primus
 * Created on: June 16, 2021
 *****************************************/

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Camera from './src/components/Camera.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <Text style={{color: 'white'}}>Babel Vision</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.settingsButton}>
            <Icon name="gear" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <Camera/>
      <TouchableOpacity>
        <View style={styles.snapButton}>
          <Text>Hello</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    width: '100%',
    backgroundColor: 'black',
  },
  settingsButton: {
  },
  snapButton: {
  },
});

export default App;
