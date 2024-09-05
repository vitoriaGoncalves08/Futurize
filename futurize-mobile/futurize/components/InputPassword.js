import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const InputPassword = () => {
  return(
    <View style={styles.inputWithIcon}>
      <TextInput
      style={styles.txtinput}
      secureTextEntry={true}
      />
      <TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

export default InputPassword;

const styles = StyleSheet.create({
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
    marginTop: 0,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  revealbtn:{
    width: 18,
    height: 18,
    position: 'absolute',
    right:12,
    marginTop: -9,
  },
})