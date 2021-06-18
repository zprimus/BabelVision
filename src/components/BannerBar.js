import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import headerLogoImg from '../assets/long_logo.png';

class BannerBar extends React.Component {
    render() {
        return(
            <View style={styles.header}>
                <View style={styles.headerLogo}>
                    {/*<Text style={{color: 'white'}}>Babel Vision</Text>*/}
                    <Image source={headerLogoImg} style={styles.headerLogoImg}/>
                </View>
                <TouchableOpacity style={styles.settingsButton}>
                    <Icon name="gear" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    headerLogo: {
      paddingLeft: 10
    },
    headerLogoImg: {
      height: 20,
      width: 120,
      resizeMode: 'stretch',
    },
    settingsButton: {
      paddingRight: 20
    }
  });

export default BannerBar;