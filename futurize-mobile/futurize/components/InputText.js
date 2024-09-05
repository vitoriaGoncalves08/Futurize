import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';

const InputText = () => {
  return (
    <View style={styles.inputArea}>
      <TextInput style={styles.txtinput} placeholder=""/>
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  inputArea:{
    width: '100%',
    height: '45',
    marginBottom: 10,
  },
  txtinput: {
    width:'98%',
    backgroundColor: '#E3E3E3',
    height: 45,
    borderRadius: 13,
    paddingLeft: 14,
    borderWidth: 0.5,
    borderColor: '#CCCCCE',
    color: '#4F4F4F',
    marginBottom: 0,
    outline: 'none',
  },
});