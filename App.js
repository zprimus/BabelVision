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
  ActivityIndicator,
  ToastAndroid,
  Platform,
  AlertIOS
} from 'react-native';

// components
import Camera from './src/components/Camera.js';
import BannerBar from './src/components/BannerBar.js';
import SnapButton from './src/components/SnapButton.js';
import LangButton from './src/components/LangButton.js';

// api
import api_nlp from './src/api/api_nlp.js';

// assets
import languages from './src/assets/languages.json';

const langList = languages.filter(function(object){
  return (object["recognize"] === true && object["translate"] === true);
}).map(function({code, name, native}){
  return {code, name, native};
}).sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      langFrom: {
        "code": "en",
        "name": "English",
        "native": "English"
      },
      langTo: {
        "code": "es",
        "name": "Spanish",
        "native": "Español"
      },
      textBuffer: '',
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
      if(textBuffer.length>100) {
        textBuffer = textBuffer.substring(0, 100)
      }
      this.setState({textBuffer: textBuffer});
    } else {
      return;
    }
  }

  updateLangFrom = (selectedCode) => {
    newLang = langList.find(({code}) => code === selectedCode);
    
    this.setState(
      { langFrom: newLang }
    );
  }

  updateLangTo = (selectedCode) => {
    newLang = langList.find(({code}) => code === selectedCode);
    
    this.setState(
      { langTo: newLang }
    );
  }

  handleSnap = () => {
    this.setState({isLoading: true});

    if(this.state.liveUpdate) {
      this.togglePauseUpdate();
    } else {
      this.setState(
        {textOriginal: this.state.textBuffer},
        () => this.handleTranslate(this.state.textOriginal, this.state.langFrom["code"], this.state.langTo["code"])
      );
    }
  }

  updateTranslationText = (newText) => {
    let textTranslation = newText.translated_text[this.state.langTo["code"]];
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
        if (Platform.OS === 'android') {
          ToastAndroid.show(err, ToastAndroid.LONG)
        }
    }); 
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.cameraContainer}>
          <Camera
            updateTextObject={this.updateTextObject}
          />
        </View>
        <View style={styles.textViewContainer}>
          <View style={styles.textInputContainer}>
            <LangButton
                selectedValue={this.state.langFrom["code"]}
                onChange={this.updateLangFrom}
                itemList={langList}
            />
            <View style={styles.textView}>
              <Text style={styles.textBox}>
                {this.state.textOriginal
                //WWWWWWWWWWW WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWW WWWWWWWW WWWWWWWW WWWWWWWWWWWWWWWWWWWW WWWWWWWWW
                }
              </Text>
            </View>
          </View>
          <View style={styles.textOutputContainer}>
            <LangButton
              selectedValue={this.state.langTo["code"]}
              onChange={this.updateLangTo}
              itemList={langList}
            />
            {
              this.state.isLoading &&
              <View style={styles.loadingStatus}>
                <ActivityIndicator size="large" color="#FBA23A"/>
              </View>
            }
            <View style={styles.textView}>
              <Text style={styles.textBox}>
                {this.state.textTranslation
              //WWWWWW WWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWWWW WWWWWWWWWWWW WWWWWWWWWWW WWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWW
                }
              </Text>
            </View>
          </View>
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
    height: '45%',
  },
  textViewContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  textInputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#808080',
    width: '50%'
  },
  textOutputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#D3D3D3',
    width: '50%'
  },
  textView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBox: {
    textAlign: 'center'
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
