import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { NavigationTab } from './src/navigation/NavigationTab';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='#7743DB'/>
      <NavigationContainer>
        <NavigationTab/>
      </NavigationContainer>
    </>
  );
}
