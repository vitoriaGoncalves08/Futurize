import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Inicial from './app/Inicial';
import Splash from './app/Splash';
import Loginf from './app/Loginf';
import RecuperarSenha from './app/RecuperarSenha';
import Home from './app/Home';
import Dashboard from './app/Dashboard';
import axios from 'axios';
import PerfilSettings from './app/PerfilSettings';
import Dashboard_User from './app/Dashboard_User';
import Tarefas from './app/Tarefas';

const api = axios.create({
  baseURL: 'http://192.168.56.1:5173/api', // replace with your API URL
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loginf"
          component={Loginf}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PerfilSettings"
          component={PerfilSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard_User"
          component={Dashboard_User}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tarefas"
          component={Tarefas}
          options={{ headerShown: false }}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
