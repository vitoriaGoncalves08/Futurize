import React from 'react';
import { View, FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onStatusChange }) => {
  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <TaskItem
            key={index}
            task={item.task}
            status={item.status}
            onStatusChange={(newStatus) => onStatusChange(index, newStatus)}
          />
        )}
      />
    </View>
  );
};

export default TaskList;