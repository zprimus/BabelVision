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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import Camera from './src/components/Camera.js';
import BannerBar from './src/components/BannerBar.js';
import SnapButton from './src/components/SnapButton.js';
import LangButton from './src/components/LangButton.js';

import api_nlp from './src/api/api_nlp.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      langFrom: 'en',
      langTo: 'es',
      textOriginal: '',
      textTranslation: '',
      pauseUpdate: false,
      liveUpdate: false,
      isLoading: false,
    }
  }

  updateTextObject = (obj) => {
    if(!this.state.pauseUpdate || !this.state.liveUpdate) {
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
  }

  handleSnap = () => {
    this.setState({isLoading: true});

    if(this.state.liveUpdate) {
      this.togglePauseUpdate();
    } else {
      this.handleTranslate(this.state.textOriginal, this.state.langFrom, this.state.langTo);
    }
  }

  updateTranslationText = (newText) => {
    let textTranslation = newText.translated_text[this.state.langTo];
    this.setState({textTranslation: textTranslation});
    this.setState({isLoading: false});
  }

  togglePauseUpdate = () => {
    this.setState({pauseUpdate: !this.state.pauseUpdate});
  }

  toggleLiveUpdate = () => {
    this.setState({liveUpdate: !this.state.liveUpdate});
  }

  handleTranslate = async (text, from, to) => {
    let data = await api_nlp.get('', {
      params: {
        text: text,
        from: from,
        to: to
      },
    })
    .then(({ data }) => this.updateTranslationText(data))
    .catch((err) => {
        console.log(err)
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.cameraContainer}>
          <LangButton
              text={this.state.langFrom}
          />
          <Camera
            updateTextObject={this.updateTextObject}
          />
        </View>
        <View style={styles.translationContainer}>
          <LangButton
            text={this.state.langTo}
          />
          {
            this.state.isLoading &&
            <View style={styles.loadingStatus}>
              <ActivityIndicator size="large" color="#FBA23A"/>
            </View>
          }
          <Text>
            {this.state.textTranslation}
          </Text>
        </View>
        <BannerBar/>
        <SnapButton
          handleSnap={this.handleSnap}
          pause={this.state.pauseUpdate}
          liveUpdate={this.state.liveUpdate}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: '40%',
  },
  translationContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  loadingStatus: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default App;
