import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Dashboard_User = () => {
  const navigation = useNavigation();
  
  // Removido o estado e dados dos projetos e modal
  // const [projects, setProjects] = useState([
  //   { id: '1', name: 'Projeto A' },
  //   { id: '2', name: 'Projeto B' },
  //   { id: '3', name: 'Projeto C' },
  // ]);
  // const [selectedProject, setSelectedProject] = useState(projects[0]);
  // const [modalVisible, setModalVisible] = useState(false);

  // Mantendo os dados das tarefas
  const [tasks, setTasks] = useState([
    {
      type: 'Tarefa',
      description: 'Descrição da Tarefa',
      due: 'Hoje, 6:20pm',
      completed: false,
    },
    {
      type: 'Tarefa',
      description: 'Descrição da Tarefa',
      due: 'Hoje, 6:20pm',
      completed: false,
    },
  ]);

  // Dados fixos para os gráficos
  const [barData, setBarData] = useState([
    { label: 'Jan', value: 10, color: 'red' },
    { label: 'Feb', value: 20, color: 'blue' },
    { label: 'Mar', value: 15, color: 'green' },
    { label: 'Apr', value: 30, color: 'orange' },
    { label: 'May', value: 25, color: 'purple' },
  ]);

  const [activityData, setActivityData] = useState([
    { label: 'Tarefas', value: 16, color: '#007BFF' },
    { label: 'Concluído', value: 12, color: '#00C851' },
    { label: 'Trabalhando', value: 8, color: '#FFC107' },
  ]);

  const handleGoHome = () => {
    navigation.navigate('Home'); // Navega para a tela "Home"
  };

  // Encontrar o valor máximo para normalizar as barras
  const maxBarValue = Math.max(...barData.map(item => item.value));
  const maxActivityValue = Math.max(...activityData.map(item => item.value));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoHome}> 
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>VISÃO GERAL DOS SEUS PROJETOS</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItemContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemNumber}>0</Text>
            <Text style={styles.summaryItemLabel}>Tarefas a Fazer</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemNumber}>0</Text>
            <Text style={styles.summaryItemLabel}>Em andamento</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemNumber}>0</Text>
            <Text style={styles.summaryItemLabel}>Feito</Text>
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
        <Text style={styles.sectionTitle}>ATIVIDADE RECENTE</Text>
        <View style={styles.activityChart}>
          {activityData.map((item, index) => (
            <View key={index} style={[styles.activityBar, { height: `${(item.value / maxActivityValue) * 100}%`, backgroundColor: item.color || 'blue' }]}>
              <Text style={styles.activityLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
        <ScrollView horizontal={true} style={styles.activityLegendContainer}>
          <View style={styles.activityLegend}>
            {activityData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendCircle, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.barChartContainer}>
        <Text style={styles.sectionTitle}>ATIVIDADES CONCLUÍDAS POR PROJETO</Text>
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

      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>TAREFAS EM REVISÃO</Text>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <View style={styles.taskDetails}>
              <Text style={styles.taskType}>{task.type}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
              <Text style={styles.taskDue}>{task.due}</Text>
            </View>
            <View style={styles.taskStatus}>
              <Text style={styles.taskStatusText}>{task.completed ? 'Concluída' : 'Pendente'}</Text>
            </View>
          </View>
        ))}
      </View>
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
  summaryContainer: {
    padding: 16,
    backgroundColor: '#fff',
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
  tasksContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskDetails: {
    flex: 1,
  },
  taskType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 12,
  },
  taskStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  taskStatusText: {
    fontSize: 14,
    marginLeft: 8,
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
  activityLegendContainer: {
    marginTop: 10,
  },
  activityLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  // Removido o estilo do modal
});

export default Dashboard_User;
