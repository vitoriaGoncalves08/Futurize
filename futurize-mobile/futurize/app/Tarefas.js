import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const TaskItem = ({ task }) => {
  const getStatusStyle = () => {
    switch (task.status) {
      case 'Concluído':
        return styles.completedTask;
      case 'Em Progresso':
        return styles.inProgressTask;
      case 'Pendente':
        return styles.pendingTask;
      default:
        return {};
    }
  };

  return (
    <View style={[styles.taskItem, getStatusStyle()]}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{task.task}</Text>
        <Image
          //source={require('./user.png')} // Replace with your actual image
          style={styles.avatar}
        />
      </View>
      <Text style={styles.statusText}>{task.status}</Text>
    </View>
  );
};

const Tarefas = ({ navigation }) => {
  const [selectedProject, setSelectedProject] = useState('Todos os Projetos');
  const [selectedStatus, setSelectedStatus] = useState('Todas');
  const [tasks, setTasks] = useState([
    { task: 'Product Testing', status: 'Em Progresso', project: 'Projeto A' },
    { task: 'Design Review', status: 'Pendente', project: 'Projeto B' },
    { task: 'Code Review', status: 'Pendente', project: 'Projeto A' },
    { task: 'Client Meeting', status: 'Em Progresso', project: 'Projeto C' },
    { task: 'Bug Fixing', status: 'Concluído', project: 'Projeto A' },
  ]);

  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const filteredTasks = tasks.filter(task => {
    return (selectedStatus === 'Todas' || task.status === selectedStatus) &&
           (selectedProject === 'Todos os Projetos' || task.project === selectedProject);
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Tarefas</Text>
      <Text style={styles.subtitle}>Abaixo está um resumo das tarefas dos seus Projetos.</Text>

      <View style={styles.filterContainer}>
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Selecionar Projeto:</Text>
          <TouchableOpacity
            style={styles.selectedFilterButton}
            onPress={() => setShowProjectOptions(!showProjectOptions)}
          >
            <Text style={styles.selectedFilterText}>{selectedProject}</Text>
          </TouchableOpacity>
          {showProjectOptions && (
            <View style={styles.optionsContainer}>
              {['Todos os Projetos', 'Projeto A', 'Projeto B', 'Projeto C'].map((project) => (
                <TouchableOpacity
                  key={project}
                  style={styles.optionButton}
                  onPress={() => {
                    setSelectedProject(project);
                    setShowProjectOptions(false);
                  }}
                >
                  <Text style={styles.optionButtonText}>{project}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filtrar por Status:</Text>
          <TouchableOpacity
            style={styles.selectedFilterButton}
            onPress={() => setShowStatusOptions(!showStatusOptions)}
          >
            <Text style={styles.selectedFilterText}>{selectedStatus}</Text>
          </TouchableOpacity>
          {showStatusOptions && (
            <View style={styles.optionsContainer}>
              {['Todas', 'Pendente', 'Em Progresso', 'Concluído'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.optionButton}
                  onPress={() => {
                    setSelectedStatus(status);
                    setShowStatusOptions(false);
                  }}
                >
                  <Text style={styles.optionButtonText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedFilterText: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  completedTask: {
    backgroundColor: '#d3d3d3', // Light gray for completed tasks
    borderColor: '#d3d3d3',
  },
  inProgressTask: {
    backgroundColor: '#d9f9d9', // Light green for in progress tasks
    borderColor: '#d9f9d9',
  },
  pendingTask: {
    backgroundColor: '#f9d9d9', // Light red for pending tasks
    borderColor: '#f9d9d9',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskName: {
    fontSize: 16,
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tarefas;
