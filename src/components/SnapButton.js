import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class SnapButton extends React.Component {
    render() {
        return(
            <View style={styles.snapButton}>
                <View style={styles.snapButtonCircleOuter}>
                    <TouchableOpacity 
                        style={[styles.snapButtonCircleInner, 
                            {backgroundColor: this.props.pause ? '#808080' : '#FBA23A'}
                        ]}
                        onPress={() => this.props.handleSnap()}
                    >
                        {   
                            this.props.liveUpdate &&
                            (
                                this.props.pause ? 
                                <Icon name="pause" size={25} color="#000" />
                                :
                                <Icon name="play" size={25} color="#000" style={{paddingLeft: 5}} />
                            )
                        }
                        
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

export default SnapButton;