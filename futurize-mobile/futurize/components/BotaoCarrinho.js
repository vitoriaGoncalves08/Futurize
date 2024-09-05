import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";



const BotaoCarrinho = ({href}) =>{
  const navigation = useNavigation();

  return(
  <TouchableOpacity style={styles.carrinho}
    onPress={() => navigation.navigate(href)}>
    <Image style={styles.carrinhobtn} source={require('../assets/img/carrinho.png')} />
  </TouchableOpacity>
  );
}

export default BotaoCarrinho;

const styles = StyleSheet.create({
    carrinhobtn:{
    width: 25,
    height: 25,
    marginBottom: 20,
    marginLeft:10, 
  },
})