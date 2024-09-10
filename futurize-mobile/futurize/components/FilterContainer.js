import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilterButton from './FilterButton';

const FilterContainer = () => {
  return (
    <View style={styles.filterContainer}>
      <FilterButton text="Todas" />
      <FilterButton text="Pendente" />
      <FilterButton text="Em Progresso" />
      <FilterButton text="Concluídas" />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default FilterContainer;