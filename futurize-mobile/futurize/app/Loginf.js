// Loginf.js
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppRegistry, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, Keyboard } from 'react-native';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const Loginf = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  async function handleApi() {
    try {
      const response = await axios.post('http://192.168.56.1:5173/login', {
        email: email,
        password: password
      });
      console.log(response.data);
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (route.params) {
      const { email, password } = route.params;
      setEmail(email || '');
      setPassword(password || '');
    }
  }, [route.params]);

  const handleLogin = async () => {
    await handleApi();
    navigation.navigate("Home")
    console.log('Logging in with email:', email, 'and password:', password);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/img/logoProjeto.png')} />
      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.description}>
        Vamos começar preenchendo o formulário abaixo.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Não tem uma conta?</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("RecuperarSenha")}>
        <Text style={styles.forgotPassword}>
          Esqueceu sua senha? Redefinir agora
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
      width: 250,
      height:50,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 10
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  accountText: {
    fontSize: 16,
    color: '#555',
  },
  accountLink: {
    fontSize: 16,
    color: '#007bff',
    marginLeft: 5,
  },
  forgotPassword: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Loginf;