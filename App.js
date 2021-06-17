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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      langFrom: 'English',
      langTo: 'Spanish',
      textOriginal: '',
      textTranslation: '',
      pauseUpdate: false,
    }
  }

  updateTextObject = (obj) => {
    if(this.state.pauseUpdate === false) {
      arraySize = obj["textBlocks"].length;
      textBuffer = '';
      for(i=0;i<arraySize;i++) {
        if(obj["textBlocks"][i]["value"].length>0) {
          textBuffer = textBuffer + ' ' + obj["textBlocks"][i]["value"];
        } else {
          continue;
        }
      }

      this.setState({textOriginal: textBuffer});
    } else {
      return;
    }

    console.log(this.state.pauseUpdate)
  }

  handleSnap() {
    this.setState({pauseUpdate: !this.state.pauseUpdate});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.cameraContainer}>
          <TouchableOpacity style={styles.langButton}>
              <Text style={{color: '#FFFFFF'}}>
                {this.state.langFrom}
              </Text>
          </TouchableOpacity>
          <Camera
            updateTextObject={this.updateTextObject}
          />
        </View>
        <View style={styles.translationContainer}>
          <TouchableOpacity style={styles.langButton}>
            <Text style={{color: '#FFFFFF'}}>
              {this.state.langTo}
            </Text>
          </TouchableOpacity>
          
          <Text>
            {this.state.textOriginal}
          </Text>
        </View>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <Text style={{color: 'white'}}>Babel Vision</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
              <Icon name="gear" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.snapButton}>
          <View style={styles.snapButtonCircleOuter}>
            <TouchableOpacity style={styles.snapButtonCircleInner} onPress={() => this.handleSnap()}>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: '50%',
  },
  translationContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF'
  },
  langButton: {
    position: 'absolute', 
    top: 0,
    padding: 10,
    backgroundColor: '#000000',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000000',
  },
  snapButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    
  },
  snapButtonCircleOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
  },
  snapButtonCircleInner: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#808080',
  },
  headerLogo: {
    paddingLeft: 20
  },
  settingsButton: {
    paddingRight: 20
  }
});

export default App;
