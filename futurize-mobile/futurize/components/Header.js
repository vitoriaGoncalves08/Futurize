import React from 'react';
import { View, Text } from 'react-native';

const Header = () => {
  return (
    <View>
      <Text style={styles.title}>Todas as Tarefas</Text>
      <Text style={styles.subtitle}>Abaixo está um resumo das tarefas.</Text>
    </View>
  );
};

const styles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
};

export default Header;