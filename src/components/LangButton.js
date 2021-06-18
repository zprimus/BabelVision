import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LangButton = (props) => {
  return (
    <View style={styles.langContainer}>
      <Picker
        style={styles.langButton}
        selectedValue={props.selectedValue}
        onValueChange={(itemValue, itemIndex) =>
          props.onChange(itemValue)
        }
      >
        {
          props.itemList.map((item, index) => (
            <Picker.Item 
              key={index}
              label={item["name"] + ' : ' + item["native"]}
              value={item["code"]}
              color={props.selectedValue === item["code"] ? '#FBA23A' : 'white'}
            />
          ))
        }
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  langContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
  langButton: {
    color: '#FFFFFF'
  },
  pickerItemStyle: {
    color: '#000000'
  }
});

export default LangButton;