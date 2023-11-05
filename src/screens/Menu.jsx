import React from 'react';
import {View,Text,Button} from 'react-native';

export default function Menu(props){
    const {navigation}=props;
    return(
        <View>
            <Button 
            title='Ir a Ejercicio1'
            onPress={()=>navigation.navigate('Ejercicio1')}/>
            <Button 
            title='Ir a Ejercicio2'
            onPress={()=>navigation.navigate('Ejercicio2')}/>
            <Button 
            title='Ir a Ejercicio3'
            onPress={()=>navigation.navigate('Ejercicio3')}/>
        </View>
    );
}