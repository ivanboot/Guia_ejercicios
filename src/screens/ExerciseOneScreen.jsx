import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Clinica from '../components/Clinica'
import { ClinicaDatos } from '../components/ClinicaDatos'

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
            <Stack.Screen
                name='Ejercicio1_datos'
                component={ClinicaDatos}
                options={{
                    title: 'Registro paciente',
                    headerStyle: {backgroundColor: '#7743DB'},
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})