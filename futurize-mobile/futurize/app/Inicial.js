import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, View, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Inicial = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
       Futurize
      </Text>
      <Image style={styles.svginicial} source={require('../assets/img/estudantes.png')} />
      <Text style={styles.centraltxt}>
        Vamos lá!
      </Text>
      <View style={styles.subtxtcont}>
        <Text style={styles.subtxt}>
          Assim como a saúde deveria ser universal, o seu acesso deveria ser a mesma maneira.
        </Text>
        <TouchableOpacity
          style={styles.btnEnter}
          onPress={() => navigation.navigate('Catalogo')}>
          <Text style={styles.buttonText}>Faça o seu Login</Text>
        </TouchableOpacity>
        <View style={styles.sair}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.btnLoginTxt}>Cadastrar minha conta</Text>
            <MaterialCommunityIcons style={styles.sairIcon} name="exit-to-app" size={24} color="#424141" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Inicial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },
  paragraph: {
    marginBottom: 20,
    color: '#b5b5b5',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  svginicial: {
    width: width * 0.7,
    height: width * 0.7,
    alignSelf: 'center',
  },
  centraltxt: {
    fontSize: width * 0.06,
    color: '#090B0B',
    marginVertical: 10,
    fontFamily: 'Helvetica'
  },
  subtxtcont: {
    width: '80%',
    alignItems: 'center',
  },
  subtxt: {
    fontSize: width * 0.035,
    marginBottom: width * 0.05,
    textAlign: 'center',
    color: '#5C7070',
  },
  btnEnter: {
    width: '80%',
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: '#118E96',
    justifyContent: 'center',
    marginVertical: width * 0.02,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: '',
    fontSize: width * 0.035,
  },
  sair: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '60%',
    height: width * 0.15,
  },
  btnLogin: {
    width: '70%', 
    height: width * 0.1,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: width * 0.02,
  },
 btnLoginTxt: {
    color: '#C0C0C0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: '',
    fontSize: 13,
  },
  sairIcon: {
    width: width * 0.03,
    height: width * 0.03,
    marginLeft: 4,
    color: '#C0C0C0',
  }
});
