import React, { useState } from 'react'
import { StyleSheet, View,TouchableOpacity } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { validateEmail } from '../utils/validations';
import { initializeApp } from '../utils/firebase';
import { Text } from '@rneui/themed';

export default function FormularioLogin(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                    });
                });
        }
        setFormError(errors);
    };
    function defaultValue() {
        return {
            email: '',
            password: '',
        };
    }
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    return (
        <View style={styles.container}>
            <Text h1>Inicia sesión en tu cuenta</Text>
            <TextInput
                style={styles.textbox}
                mode="outlined"
                placeholder="Correo*"
            />
            <TextInput
                style={styles.textbox}
                placeholder="Contraseña*"
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
                Iniciar sesión
            </Button>
            <View style={styles.linkContainer}>
                <Text style={styles.text}>No tienes una cuenta aún?</Text>
                <Button onPress={changeForm} style={styles.linkBtn}>
                    Registrate
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