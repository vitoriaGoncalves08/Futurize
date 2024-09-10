import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.filterButton} onPress={onPress}>
      <Text style={styles.filterButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#333',
  },
});

export default FilterButton;