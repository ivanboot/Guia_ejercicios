import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from "@expo/vector-icons";

//screens
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ExerciseOneScreen from '../screens/ExerciseOneScreen'
import ExerciseTwoScreen from '../screens/ExerciseTwoScreen'
import ExerciseThreeScreen from '../screens/ExerciseThreeScreen'

const Tab = createBottomTabNavigator()

export function NavigationTab() {
  return (
    <Tab.Navigator
      initialRouteName='Inicio'
      screenOptions={{
        tabBarActiveTintColor: '#7743DB'
      }}
    >
        <Tab.Screen 
          name='Inicio' 
          component={HomeScreen}
          options={{
            headerStyle: {backgroundColor: '#7743DB'},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name='Ejercicio 1' 
          component={ExerciseOneScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name="medical-bag" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name='Ejercicio 2' 
          component={ExerciseTwoScreen}
          options={{
            headerStyle: {backgroundColor: '#7743DB'},
            headerTitle: 'Consultando IP',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name="ip-network" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name='Ejercicio 3' 
          component={ExerciseThreeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name="clipboard-edit" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name='Configuraciones' 
          component={SettingsScreen}
          options={{
            headerStyle: {backgroundColor: '#7743DB' },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name="account-settings" size={size} color={color} />
            )
          }}
        />
    </Tab.Navigator>
  )
}