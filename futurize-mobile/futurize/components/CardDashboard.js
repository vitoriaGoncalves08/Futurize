import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardDashboard = () => {
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

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Abaixo está um resumo do seu dia.</Text>
        <View style={styles.summaryItemContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemNumber}>16</Text>
            <Text style={styles.summaryItemLabel}>Adicionadas</Text>
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
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>Tarefas Atuais</Text>
        <Text style={styles.tasksSubtitle}>Um resumo de suas tarefas</Text>
        <ScrollView>
          {tasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={styles.taskItem}
              onPress={() => handleTaskCompletion(index)}
            >
              <View style={styles.taskDetails}>
                <Text style={styles.taskType}>{task.type}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <Text style={styles.taskDue}>{task.due}</Text>
              </View>
              <View style={styles.taskStatus}>
                {task.completed ? (
                  <MaterialCommunityIcons name="check-circle" size={24} color="green" />
                ) : (
                  <MaterialCommunityIcons name="circle-outline" size={24} color="gray" />
                )}
                <Text style={styles.taskStatusText}>Atualização</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Atividade recente</Text>
        <Text style={styles.activitySubtitle}>
          Abaixo está uma visão geral das tarefas e trabalhos concluídos.
        </Text>
        <View style={styles.activityOptions}>
          <TouchableOpacity style={styles.activityOption}>
            <MaterialCommunityIcons name="circle" size={24} color="gray" />
            <Text style={styles.activityOptionLabel}>Tarefas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityOption}>
            <MaterialCommunityIcons name="circle" size={24} color="#596c7e" />
            <Text style={styles.activityOptionLabel}>Concluído</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityOption}>
            <MaterialCommunityIcons name="circle" size={24} color="#e76f51" />
            <Text style={styles.activityOptionLabel}>Trabalhando</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityGraph}>
          {/* Placeholder for graph */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  activityContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activitySubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  activityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  activityOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityOptionLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  activityGraph: {
    height: 200,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
});

export default CardDashboard;