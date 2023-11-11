import React, { useState } from 'react'
import { View } from 'react-native'
import FormularioLogin from './FormularioLogin'
import FormularioRegistro from './FormularioRegistro'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)

    const changeForm = () => {
        setIsLogin(!isLogin)
    }

    return (
        <View style={{ flex: 1 }}>

            {isLogin ? (
                <FormularioLogin changeForm={changeForm} />
            ) : (
                <FormularioRegistro changeForm={changeForm} />
            )
            }
        </View>
    )
}
