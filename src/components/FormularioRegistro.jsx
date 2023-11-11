import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { Text } from '@rneui/themed';

export default function FormularioRegistro() {
    return (
        <View style={styles.container}>
            <Text h1>Create an account</Text>
            <TextInput
                keyboardType="email-address"
                style={styles.textbox}
                mode="outlined"
                placeholder="Email*"
            />
            <TextInput
                style={styles.textbox}
                mode="outlined"
                placeholder="Password*"
                secureTextEntry
            />
            <TextInput
                style={styles.textbox}
                mode="outlined"
                placeholder="Repeat password*"
                secureTextEntry
            />
            <Button
                style={styles.button}
                mode="contained"
            >
                Sign up
            </Button>
            <View style={styles.linkContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <Button onPress={() => (console.log('Registrando'))} style={styles.linkBtn}>
                    Sign in
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        top: '100%'
    },
    textbox: {
        width: '90%',
        marginTop: '3%'
    },
    button: {
        marginTop: '10%',
        width: '85%'
    },
    linkContainer: {
        marginTop: '5%',
        display: "flex",
        flexDirection: "row",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: 'left',
    },
    linkBtn: {
        margin: 0,
        padding: 0,
    }
})