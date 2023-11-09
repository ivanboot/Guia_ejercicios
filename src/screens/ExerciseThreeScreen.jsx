import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Api from '../components/Api'

const Stack = createStackNavigator()

export default function ExerciseThreeScreen() {
    return (
        <Api/>
    )
}

const styles = StyleSheet.create({})