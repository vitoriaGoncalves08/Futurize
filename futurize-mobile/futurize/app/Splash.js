import React, { useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View } from 'react-native';


const Splash = ({navigation}) => {
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);
      
      return () => clearTimeout(timer); 
    }, [navigation]);
  
    return (
      <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={require('../assets/img/logoProjeto.png')} />
      </SafeAreaView>
    );
  }

  export default Splash;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '##fcf9d8',
      padding: 8,
    },
    logo: {
      
      width: 250,
      height:50,
      alignSelf: 'center',
      marginBottom: 60
    }
  });
  