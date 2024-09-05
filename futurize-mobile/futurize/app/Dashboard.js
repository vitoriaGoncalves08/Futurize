import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();
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

  /*const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };*/

 /*const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };*/

const handleGoHome = () => {
    navigation.navigate('Home'); // Navega para a tela "Home"
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Abaixo está um resumo do seu dia.</Text>
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
          {/* Adicione um gráfico de linha ou gráfico de barras aqui
            usando uma biblioteca de gráficos como 'react-native-chart-kit' */}
        </View>
        <View style={styles.activityLegend}>
          <View style={styles.legendItem}>
            <View style={styles.legendCircle} />
            <Text style={styles.legendText}>Tarefas</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendCircle, { backgroundColor: '#00C851' }]} />
            <Text style={styles.legendText}>Concluído</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendCircle, { backgroundColor: '#FFC107' }]} />
            <Text style={styles.legendText}>Trabalhando</Text>
          </View>
        </View>
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
  tasksSubtitle: {
    fontSize: 14,
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
    marginBottom: 10,
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
    backgroundColor: '#007BFF',
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',

  },

});

export default Dashboard;