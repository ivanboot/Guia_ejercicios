import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Api from '../components/Api'

const Stack = createStackNavigator()

export default function ExerciseThreeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Ejercicio2'
                component={Api}
                options={{
                    title: 'Consultando API',
                    headerStyle: { backgroundColor: '#7743DB' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})