import React, { useState, useEffect, createContext, useContext } from 'react';

import auth from '@react-native-firebase/auth';

export const AuthContext = createContext(null)


export function AuthContextWrapper(props) {

  
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)
  const [newUser, setNewUser] = useState(false)


  function onAuthStateChanged(result) {
    setUser(result)
  
    if (initializing) setInitializing(false)
  }
  
  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)

    // unsubscribe on unmount
    return authSubscriber
  }, [])

  if (initializing) {

    return null
  }

  return (<AuthContext.Provider value={{user, setNewUser, newUser}}>
    {props.children}
    </AuthContext.Provider>
    );
 
}