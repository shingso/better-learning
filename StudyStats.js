import React, { useState, useEffect, createContext, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext'
import { format, isThisMonth, isThisYear, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'

export const StudyStatsContext = createContext(null)

export function StudyStatsContextWrapper(props) {

  const user = useContext(AuthContext)
  const userID = user.uid
  const [initializing, setInitializing] = useState(true)
  const [dates, setDates] = React.useState([]);
  const [timesStudied, setTimesStudied] = React.useState(0);
  const [timesStudiedWeek, setTimesStudiedWeek] = React.useState(0);
  const [timesStudiedMonth, setTimesStudiedMonth] = React.useState(0);
  
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID).collection('DatesStudied')
    
    const currentDate = new Date()
    const startOfCurrentWeek = startOfWeek(currentDate)
    const endOfCurrentWeek = endOfWeek(currentDate)
    

    return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
      
      if(!querySnapshot.metadata.hasPendingWrites){
      
      const list = [];
      const datesDict = {}
      var count = 0
      var weekCount = 0

      querySnapshot.forEach(doc => {

          const timeStamp = doc.get('timeStamp', { serverTimestamps: 'estimate' })
          const newDate = new Date(timeStamp.toDate())
          const currentDate = format(newDate, 'yyyy-MM-dd')
          
          //check if date is within the current Week
          if(isWithinInterval(newDate, {start:startOfCurrentWeek, end:endOfCurrentWeek})){
            weekCount += 1
          }

          //check iof date is within current month and year
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
      setTimesStudiedWeek(weekCount)
      setTimesStudiedMonth(count)
      setDates(list);
      setInitializing(false)


    }
  });
  
  }, []);

  if (initializing) {

    return null
  }

  return (<StudyStatsContext.Provider value={{dates, timesStudied, timesStudiedMonth, timesStudiedWeek}}>
    {props.children}
    </StudyStatsContext.Provider>
    );
 
}