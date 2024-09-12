import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();
  
  // Dados dinâmicos dos projetos
  const [projects, setProjects] = useState([
    { id: '1', name: 'Projeto 1' },
    { id: '2', name: 'Projeto 2' },
    { id: '3', name: 'Projeto 3' },
  ]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [modalVisible, setModalVisible] = useState(false);

  // Dados dinâmicos para os gráficos, baseados no projeto selecionado
  const [barData, setBarData] = useState([
    { label: 'Projeto A', value: 10, color: 'red' },
    { label: 'Projeto B', value: 20, color: 'blue' },
    { label: 'Projeto C', value: 15, color: 'green' },
    { label: 'Projeto D', value: 30, color: 'orange' },
    { label: 'Projeto E', value: 25, color: 'purple' },
  ]);

  const [activityData, setActivityData] = useState([
    { label: 'Tarefas', value: 16, color: '#007BFF' },
    { label: 'Concluído', value: 12, color: '#00C851' },
    { label: 'Trabalhando', value: 8, color: '#FFC107' },
  ]);

  // Encontrar o valor máximo para normalizar as barras
  const maxBarValue = Math.max(...barData.map(item => item.value));
  const maxActivityValue = Math.max(...activityData.map(item => item.value));

  const handleGoHome = () => {
    navigation.navigate('Home'); // Navega para a tela "Home"
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setModalVisible(false);
    
    // Atualizar os dados dos gráficos com base no projeto selecionado
    // Este é apenas um exemplo; você pode atualizar com dados reais
    if (project.id === '1') {
      setBarData([
        { label: 'Projeto A', value: 10, color: 'red' },
        { label: 'Projeto B', value: 20, color: 'blue' },
        { label: 'Projeto C', value: 15, color: 'green' },
        { label: 'Projeto D', value: 30, color: 'orange' },
        { label: 'Projeto E', value: 25, color: 'purple' },
      ]);
      setActivityData([
        { label: 'Tarefas', value: 16, color: '#007BFF' },
        { label: 'Concluído', value: 12, color: '#00C851' },
        { label: 'Trabalhando', value: 8, color: '#FFC107' },
      ]);
    } else if (project.id === '2') {
      setBarData([
        { label: 'Projeto', value: 20, color: 'cyan' },
        { label: 'Projeto B', value: 30, color: 'magenta' },
        { label: 'Projeto C', value: 40, color: 'yellow' },
        { label: 'Projeto D', value: 35, color: 'green' },
        { label: 'Projeto E', value: 28, color: 'orange' },
      ]);
      setActivityData([
        { label: 'Tarefas', value: 20, color: '#007BFF' },
        { label: 'Concluído', value: 15, color: '#00C851' },
        { label: 'Trabalhando', value: 10, color: '#FFC107' },
      ]);
    } else if (project.id === '3') {
      setBarData([
        { label: 'Projeto A', value: 15, color: 'brown' },
        { label: 'Projeto B', value: 25, color: 'gray' },
        { label: 'Projeto C', value: 20, color: 'blue' },
        { label: 'Projeto D', value: 10, color: 'red' },
        { label: 'Projeto E', value: 30, color: 'purple' },
      ]);
      setActivityData([
        { label: 'Tarefas', value: 18, color: '#007BFF' },
        { label: 'Concluído', value: 14, color: '#00C851' },
        { label: 'Trabalhando', value: 12, color: '#FFC107' },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoHome}> 
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.projectSelector}>
          <Text style={styles.title}>{selectedProject.name}</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItemContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemNumber}>16</Text>
            <Text style={styles.summaryItemLabel}>Para Fazer</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemNumber}>16</Text>
            <Text style={styles.summaryItemLabel}>Em trabalho</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemNumber}>16</Text>
            <Text style={styles.summaryItemLabel}>Concluídas</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Progresso Atual</Text>
        <View style={styles.progressItems}>
          <Text style={styles.progressItemNumber}>15/26</Text>
          <Text style={styles.progressItemLabel}>Progresso Atual</Text>
          <Text style={styles.progressItemNumber}>12</Text>
          <Text style={styles.progressItemLabel}>Tarefas à concluir</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atividade Recente</Text>
        <View style={styles.activityChart}>
          {activityData.map((item, index) => (
            <View key={index} style={[styles.activityBar, { height: `${(item.value / maxActivityValue) * 100}%`, backgroundColor: item.color || 'blue' }]}>
              <Text style={styles.activityLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.activityLegend}>
          {activityData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendCircle, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.barChartContainer}>
        <Text style={styles.sectionTitle}>Atividades Concluídaspor Projeto</Text>
        
        <View style={styles.barChart}>
          {barData.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${(item.value / maxBarValue) * 100}%`,
                    backgroundColor: item.color || 'blue',
                  },
                ]}
              />
              <Text style={styles.barLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Modal para seleção de projeto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha um Projeto</Text>
            <FlatList
              data={projects}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleProjectSelect(item)} style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  projectSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 16,
  },
  summaryItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryItemNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryItemLabel: {
    fontSize: 14,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItemNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressItemLabel: {
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityChart: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  activityBar: {
    width: 40,
    alignItems: 'center',
  },
  activityLabel: {
    marginTop: 5,
    fontSize: 12,
  },
  activityLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  barChartContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  barChart: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  barContainer: {
    alignItems: 'center',
    width: 40,
  },
  bar: {
    width: '100%',
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Dashboard;
