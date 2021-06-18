import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
  } from 'react-native';

  const LangButton = (props) => {
      return (
        <TouchableOpacity style={styles.langButton}>
            <Text style={{color: '#FFFFFF'}}>
                {props.text}
            </Text>
        </TouchableOpacity>
      );
  }

  const styles = StyleSheet.create({
    langButton: {
      position: 'absolute', 
      top: 0,
      padding: 10,
      backgroundColor: '#000000',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
  });

  export default LangButton;