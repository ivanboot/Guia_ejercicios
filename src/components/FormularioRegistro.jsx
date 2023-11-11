import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { validateEmail } from '../utils/validations';
import {auth} from '@react-native-firebase/auth'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../utils/firebase';
import { Text } from '@rneui/themed';

export default function FormularioRegistro(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    const registro = () => {
        console.log("Me has presionado papa");
        let errors = {};
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            errors.password = true;
            errors.repeatPassword = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
        } else {
                createUserWithEmailAndPassword(auth,formData.email, formData.password)
                .then(()=>{
                    console.log("Cuenta creada!")
                })
                .catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                        repeatPassword: true,
                    });
                });
        }
        setFormError(errors);
    };

    function defaultValue() {
        return {
          email: '',
          password: '',
          repeatPassword: '',
        };
      }

    return (
        <View style={styles.container}>
            <Text h1>Crear una cuenta</Text>
            <TextInput
                keyboardType="email-address"
                style={styles.textbox}
                mode="outlined"
                placeholder="Correo*"
                onChange={(value)=> 
                    setFormData({...formData, email: value.nativeEvent.text})}
            />
            <TextInput
                style={styles.textbox}
                mode="outlined"
                placeholder="Contraseña*"
                secureTextEntry
                onChange={(value)=> 
                    setFormData({...formData, password: value.nativeEvent.text})}
            />
            <TextInput
                style={styles.textbox}
                mode="outlined"
                placeholder="Repetir Contraseña*"
                secureTextEntry
                onChange={(value)=> 
                    setFormData({...formData, repeatPassword: value.nativeEvent.text})}
            />
            <Button
                style={styles.button}
                mode="contained"
                onPress={registro}
            >Registrar
            </Button>
            <View style={styles.linkContainer}>
                <Text style={styles.text}>Ya tienes una cuenta?</Text>
                <Button onPress={changeForm} style={styles.linkBtn}>
                    Inicia sesión
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