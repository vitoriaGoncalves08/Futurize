import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Home = ({ navigation }) => {
  const [items] = useState([
    { id: 1, text: 'Este é um ótimo item.' },
    { id: 2, text: 'Este é um ótimo item.' },
    { id: 3, text: 'Este é um ótimo item.' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo, Maverick</Text>
      
      <View style={styles.dashboard}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard_User")}>
          <View style={styles.dashboardIcon}>
            {/* Inserir ícone aqui se desejar */}
            <Text>Dashboard</Text>
          </View>
          <Text style={styles.dashboardText}>VISÃO GERAL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tarefas")}>
          <Text style={styles.buttonText}>Para Fazer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Últimos Projetos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <Text style={styles.listItemText}>{item.text}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dashboard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  dashboardIcon: {
    // Substitua pelo estilo do ícone se necessário
    fontSize: 24,
    marginBottom: 10,
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 8,
  },
  listItemText: {
    fontSize: 16,
  },
});

export default Home;
