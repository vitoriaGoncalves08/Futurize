import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Switch,
} from 'react-native';

const Home = ({ navigation }) => {
  const [items] = useState([
    { id: 1, text: 'Este é um ótimo item.' },
    { id: 2, text: 'Este é um ótimo item.' },
    { id: 3, text: 'Este é um ótimo item.' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para modo escuro

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    navigation.navigate('Loginf'); // Navega para a tela de login
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>Bem Vindo, Maverick</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.userIcon}>
          <Text style={styles.userIconText}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.dashboard, isDarkMode && styles.dashboardDark]}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard_User")}>
          <View style={styles.dashboardIcon}>
            {/* Inserir ícone aqui se desejar */}
            <Text>Dashboard</Text>
          </View>
          <Text style={[styles.dashboardText, isDarkMode && styles.dashboardTextDark]}>VISÃO GERAL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={() => navigation.navigate("Tarefas")}>
          <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Para Fazer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]}>
          <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Últimos Projetos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={[styles.listItem, isDarkMode && styles.listItemDark]}>
            <Text style={[styles.listItemText, isDarkMode && styles.listItemTextDark]}>{item.text}</Text>
          </View>
        ))}
        <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={() => navigation.navigate("Dashboard")}>
          <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para Configurações do Usuário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, isDarkMode && styles.modalContainerDark]}>
            <Text style={[styles.modalTitle, isDarkMode && styles.modalTitleDark]}>Configurações de Usuário</Text>
            
            <View style={styles.modalOption}>
              <Text style={[styles.modalOptionText, isDarkMode && styles.modalOptionTextDark]}>Modo Escuro</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
            
            <Pressable
              style={[styles.button, styles.modalButton, isDarkMode && styles.modalButtonDark]}
              onPress={handleLogout}
            >
              <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Logout</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.modalButton, isDarkMode && styles.modalButtonDark]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleDark: {
    color: '#fff',
  },
  userIcon: {
    padding: 10,
  },
  userIconText: {
    fontSize: 32,
  },
  dashboard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  dashboardDark: {
    backgroundColor: '#444',
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
  dashboardTextDark: {
    color: '#fff',
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
  buttonDark: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
  },
  buttonTextDark: {
    color: '#fff',
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
  listItemDark: {
    backgroundColor: '#666',
  },
  listItemText: {
    fontSize: 16,
  },
  listItemTextDark: {
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalContainerDark: {
    backgroundColor: '#444',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalTitleDark: {
    color: '#fff',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalOptionTextDark: {
    color: '#fff',
  },
  modalButton: {
    marginTop: 10,
    width: '100%',
  },
  modalButtonDark: {
    backgroundColor: '#555',
  },
});

export default Home;
