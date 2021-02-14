import React, { useState, useEffect, createContext, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext'

export const SubjectsContext = createContext(null)


export function SubjectsContextWrapper(props) {

  const authContext = useContext(AuthContext)
  const userID = authContext.user.uid
  
  const [initializing, setInitializing] = useState(true)
  const [subjects, setSubjects] = useState([])
  const [lastUsedSubject, setLastUsedSubject] = useState(null)

  function subjectsSet(result) {
    setSubjects(result)
    if (initializing) setInitializing(false)
  }
  
  
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID).collection('Subjects').orderBy('lastUsed', 'desc')
    return ref.onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const { title, lastUsed } = doc.data();
          list.push({
            id: doc.id,
            title,
            lastUsed: lastUsed
          });
        });


        subjectsSet(list);
        if(list[0] != null){
          setLastUsedSubject(list[0])
        }
     

      })

  }, []);

  if (initializing) {

    return null
  }

  return (<SubjectsContext.Provider value={{subjects, lastUsedSubject, setLastUsedSubject}}>
    {props.children}
    </SubjectsContext.Provider>
    );
 
}