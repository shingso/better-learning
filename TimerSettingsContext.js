import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimerSettingsContext = createContext(null)


export function TimerSettingsContextWrapper(props) {


  const [initializing, setInitializing] = useState(true)
  const [timeSettings, setTimeSettings] = useState(null)


  function TimeSettingsSet(result) {
    setTimeSettings(result)
    if (initializing) setInitializing(false)
  }
  
  
  useEffect(() => {

    async function getTimeSettings(){
        try {
            const value = await AsyncStorage.getItem('@timeSettings')
            if(value !== null) {
              TimeSettingsSet(value)
        
            } else {
                AsyncStorage.setItem('@timeSettings', '25')
                setTimeSettings('25')
                setInitializing(false)
            }
          } catch(e) {
            console.log(e)
          }
    }

    getTimeSettings()

  }, []);

  if (initializing) {

    return null
  }

  return (<TimerSettingsContext.Provider value={{timeSettings,setTimeSettings}}>
    {props.children}
    </TimerSettingsContext.Provider>
    );
 
}