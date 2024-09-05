import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';

const PerfilSettings = () => {
  const [isActive, setIsActive] = useState(true);
  const navigation = useNavigation();

  const toggleSwitch = () => {
    setIsActive((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.name}>User Name</Text>
        <Text style={styles.email}>email@domainname.com</Text>
      </View>
      <View style={styles.settings}>
        <View style={styles.setting}>
          <View style={styles.icon}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isActive ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isActive}
            />
          </View>
          <Text style={styles.settingText}>Active</Text>
        </View>
        <TouchableOpacity style={styles.setting}>
          <View style={styles.icon}>
            {/* Icon for edit profile */}
          </View>
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <View style={styles.icon}>
            {/* Icon for account settings */}
          </View>
          <Text style={styles.settingText}>Account Settings</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Loginf')}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
 /* profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },*/
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  settings: {
    marginBottom: 30,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    flex: 1,
    alignItems: 'flex-start',
  },
  settingText: {
    flex: 3,
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PerfilSettings;