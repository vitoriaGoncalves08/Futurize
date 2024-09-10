import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  CheckBox,
} from 'react-native';

const Home = ({ navigation }) => {
  const [items, setItems] = useState([
    { id: 1, text: 'Este é um ótimo item.', completed: false },
    { id: 2, text: 'Este é um ótimo item.', completed: false },
    { id: 3, text: 'Este é um ótimo item.', completed: false },
  ]);

  const handleCheck = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo, Maverick</Text>
      <View style={styles.dashboard}>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard_User")}>
        <View style={styles.dashboardIcon}>
          {/* colocar icone*/}
          <Text>Dashboard Icon</Text>
        </View>
        <Text style={styles.dashboardText}>Dashboard</Text>
        <Text style={styles.dashboardInfo}>
          3 Projects | 45 Files
        </Text>
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
            <CheckBox
              value={item.completed}
              onValueChange={() => handleCheck(item.id)}
            />
            <Text style={styles.listItemText}>{item.text}</Text>
            <TouchableOpacity style={styles.listItemButton}>
              <Text style={styles.listItemButtonText}>
                Acompanhar
              </Text>

            </TouchableOpacity>
            
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
    // Replace with your icon style
    fontSize: 24,
    marginBottom: 10,
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dashboardInfo: {
    color: '#888',
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 8,
  },
  listItemText: {
    flex: 1,
  },
  listItemButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  listItemButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;