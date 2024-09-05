import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Botao = ({href, textBtn}) =>{
  const navigation = useNavigation();

  return(
      <View style={styles.loginBtnArea}>
        <TouchableOpacity
            style={styles.btnEnter}
            onPress={() => navigation.navigate(href)}>
            <Text style={styles.buttonText}>{textBtn}</Text>
        </TouchableOpacity>
      </View>
  );
}


export default Botao;

const styles = StyleSheet.create({
  loginBtnArea: {
    marginTop: 10,
    width: '100%',
    height: '5%',
    alignItems: 'center',
  },
  btnEnter: {
    width: '100%',
    height: 45,
    color: '#118E96',
    borderRadius: 20,
    backgroundColor: '#118E96',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
  }  
)