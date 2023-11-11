import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { NavigationTab } from './src/navigation/NavigationTab';
import FormularioLogin from './src/components/FormularioLogin';
import FormularioRegistro from './src/components/FormularioRegistro';
import { auth } from '@react-native-firebase/auth'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './src/utils/firebase';

export default function App() {

  const [user, setUser] = useState(undefined);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar backgroundColor='#7743DB' />
      {user ?

        <NavigationContainer>
          <NavigationTab user={user} />
        </NavigationContainer>
        :
        <Auth />
      }

      {/*  <FormularioLogin/> */}
      {/* <NavigationContainer>
        <NavigationTab/>
      </NavigationContainer> */}
    </>
  );
}
