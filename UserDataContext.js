import React, { useState, useEffect, createContext, useContext } from 'react';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext'
import { format, differenceInHours } from 'date-fns'

export const UserDataContext = createContext(null)


export function UserDataContextWrapper(props) {

  const user = useContext(AuthContext)
  const userID = user.uid
  
  const [initializing, setInitializing] = useState(true)
  const [ userData, setUserData] = useState(null)

  function UserDataSet(result) {
    setUserData(result)
    if (initializing) setInitializing(false)
  }
  
  
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID)
    const subscriber = ref.onSnapshot(documentSnapshot => {

      UserDataSet(documentSnapshot.data());
      
      });


    return () => subscriber();
  }, []);

  if (initializing) {

    return null
  }

  return (<UserDataContext.Provider value={userData}>
    {props.children}
    </UserDataContext.Provider>
    );
 
}