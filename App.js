import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { NavigationTab } from './src/navigation/NavigationTab';
import FormularioLogin from './src/components/FormularioLogin';
import FormularioRegistro from './src/components/FormularioRegistro';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='#7743DB'/>
      {/* <FormularioRegistro/> */}
      <FormularioLogin/>
      {/* <NavigationContainer>
        <NavigationTab/>
      </NavigationContainer> */}
    </>
  );
}
