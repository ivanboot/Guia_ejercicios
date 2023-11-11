import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { Text } from '@rneui/themed';

export default function FormularioLogin() {
    return (
        <View style={styles.container}>
            <Text h1>Sign in to your account</Text>
            <TextInput
                style={styles.textbox}
                mode="outlined"
                placeholder="Email*"
            />
            <TextInput
                style={styles.textbox}
                placeholder="Password*"
                secureTextEntry
                mode="outlined"
            />
            <Button
                style={styles.button}
                mode="contained"
                onPress={() => {
                    onEmailAndPasswordLogin();
                }}
            >
                Sign in
            </Button>
            <Text>or</Text>

            <View style={styles.linkContainer}>
                <Text style={styles.text}>Don&apos;t you have an account yet?</Text>
                <Button onPress={()=>(console.log('Registrando'))} style={styles.linkBtn}>
                    Sign up
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
    textbox: {
        width: '90%',
        marginTop: '3%'
    },
    button: {
        marginTop: '10%',
        width: '85%',
        marginBottom: '2%',
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
    },
    googleButton: {
        marginTop: '2%',
        width: '85%',
    },
})