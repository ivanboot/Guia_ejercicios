import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Clinica from '../components/Clinica'

const Stack = createStackNavigator()

export default function ExerciseOneScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Ejercicio1'
                component={Clinica}
                options={{
                    title: 'Clinica Amaya',
                    headerStyle: {backgroundColor: '#7743DB'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})