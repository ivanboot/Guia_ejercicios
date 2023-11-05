import * as React from 'react';
import {View,Text,StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ejercicio1 from './src/screens/Ejercicio1';
import Ejercicio2 from './src/screens/Ejercicio2';
import Ejercicio3 from './src/screens/Ejercicio3';
import Menu from './src/screens/Menu';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
            <Stack.Screen name="Menu" component={Menu} options={{title:'Menu'}} />
            <Stack.Screen name="Ejercicio1" component={Ejercicio1} options={{title:'Ejercicio1'}} />
            <Stack.Screen name="Ejercicio2" component={Ejercicio2} options={{title:'Ejercicio2'}} />
            <Stack.Screen name="Ejercicio3" component={Ejercicio3} options={{title:'Ejercicio3'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
