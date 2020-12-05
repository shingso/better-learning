import React, { useState, useEffect, createContext, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext'
import { format, isThisMonth, isThisYear } from 'date-fns'

export const StudyStatsContext = createContext(null)


export function StudyStatsContextWrapper(props) {

  const user = useContext(AuthContext)
  const userID = user.uid
  const [initializing, setInitializing] = useState(true)
  const [dates, setDates] = React.useState([]);
  const [timesStudied, setTimesStudied] = React.useState(0);
  const [timesStudiedMonth, setTimesStudiedMonth] = React.useState(0);
  
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID).collection('DatesStudied')
 
    return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
      
      if(!querySnapshot.metadata.hasPendingWrites){
      
      const list = [];
      const datesDict = {}
      var count = 0

      querySnapshot.forEach(doc => {

          const timeStamp = doc.get('timeStamp', { serverTimestamps: 'estimate' })
          const newDate = new Date(timeStamp.toDate())
          const currentDate = format(newDate, 'yyyy-MM-dd')
        
          if(isThisMonth(newDate) && isThisYear(newDate)){
            count +=1
          }

          if(currentDate in datesDict){
            datesDict[currentDate] += 1
          } else {
            datesDict[currentDate] = 1
          }
      

      });

     

      for (var date in datesDict) {
        let item = {};
        item.date = date; 
        list.push(item)
     }

     
      setTimesStudied(querySnapshot.size)
      setTimesStudiedMonth(count)
      setDates(list);
      setInitializing(false)


    }
  });
  
  }, []);

  if (initializing) {

    return null
  }

  return (<StudyStatsContext.Provider value={{dates, timesStudied, timesStudiedMonth}}>
    {props.children}
    </StudyStatsContext.Provider>
    );
 
}