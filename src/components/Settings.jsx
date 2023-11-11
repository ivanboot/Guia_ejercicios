import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Button } from "react-native-paper";
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../utils/firebase';

export function Settings({props}) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const cerrarSesion = () => {
    signOut(auth).then(()=>{
      Alert.alert(
        'Success',
        'Se cerró sesión',
        [{
          text: 'Ok'
        }]
      )
      console.log('Se ha cerrado sesion');
    }).catch((error)=>{
      console.log('No se ha podido cerrar sesion', error);
    })
  }
  return (
    <View style={styles.container}>
      <Button style={styles.button} mode='contained' onPress={cerrarSesion}>Cerrar Sesión</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '85%',
  },
})