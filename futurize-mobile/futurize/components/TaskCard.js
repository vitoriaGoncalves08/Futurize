import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskCard = ({ title, description, dueDate }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.dueDate}>Due: {dueDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  dueDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default TaskCard;