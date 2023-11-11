import React, { useEffect, useState } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer,} from '@react-navigation/native'
import { NavigationTab } from './src/navigation/NavigationTab';
import { auth } from '@react-native-firebase/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './src/utils/firebase';

import Auth from './src/components/Auth';

LogBox.ignoreAllLogs(['Setting a timer']);
export default function App() {

  const [user, setUser] = useState(undefined);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
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
    </>
  );
}
