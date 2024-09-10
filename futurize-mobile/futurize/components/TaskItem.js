import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TaskItem = ({ task, status, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <View style={styles.taskItem}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{task}</Text>
        <Image
          //source={require('./user.png')} // Replace with your actual image
          style={styles.avatar}
        />
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[styles.statusButton, selectedStatus === 'Em Progresso' && styles.activeStatus]}
          onPress={() => handleStatusChange('Em Progresso')}
        >
          <Text style={styles.statusButtonText}>Em Progresso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusButton, selectedStatus === 'Pendente' && styles.activeStatus]}
          onPress={() => handleStatusChange('Pendente')}
        >
          <Text style={styles.statusButtonText}>Pendente</Text>
        </TouchableOpacity>
        {/* Add more status buttons as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  statusContainer: {
    flexDirection: 'row',
  },
  statusButton: {
    padding: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  activeStatus: {
    backgroundColor: '#007bff', // Blue for active status
    borderColor: '#007bff',
  },
  statusButtonText: {
    color: '#fff', // White text for active status
  },
});

export default TaskItem;