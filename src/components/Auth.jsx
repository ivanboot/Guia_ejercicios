import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import FormularioLogin from './FormularioLogin'
import FormularioRegistro from './FormularioRegistro'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    
    const changeForm = () => {
        setIsLogin(isLogin)
    }

    return (
        <View>
            <Image style={styles.logo} source={require('../../assets/icon.png')} />
            {
                isLogin ? (
                    <FormularioLogin changeForm={changeForm}/>
                ) : (
                    <FormularioRegistro changeForm={changeForm}/>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 200,
        marginTop: 'auto',
        marginBottom: 'auto'
    }
})