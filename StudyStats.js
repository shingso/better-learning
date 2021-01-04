import React, { useState, useEffect, createContext, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext'
import { format, isThisMonth, isThisYear, startOfWeek, endOfWeek, isWithinInterval, subDays } from 'date-fns'

export const StudyStatsContext = createContext(null)

export function StudyStatsContextWrapper(props) {

  const authContext = useContext(AuthContext)
  const userID = authContext.user.uid
  const [initializing, setInitializing] = useState(true)
  const [dates, setDates] = React.useState([]);
  const [timesStudied, setTimesStudied] = React.useState(0);

  const [datesStudiedPastSeven, setDatesStudiedPastSeven] = React.useState(0);

  const [timesStudiedWeek, setTimesStudiedWeek] = React.useState(0);
  const [timesStudiedTwoWeek, setTimesStudiedTwoWeek] = React.useState(0);
  const [timesStudiedTwoWeeksUnique, setTimesStudiedTwoWeeksUnique] = React.useState(0);
  const [timesStudiedMonth, setTimesStudiedMonth] = React.useState(0);
  const [currentWeekStudiedSet, setCurrentWeekStudiedSet] = React.useState(0);
  const [allDates, setAllDates] = React.useState(0);
  const [uniqueDates, setUniqueDates] = React.useState(0);

  
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID).collection('DatesStudied')
    
    const currentDate = new Date()
    const startOfCurrentWeek = startOfWeek(currentDate)
    const endOfCurrentWeek = endOfWeek(currentDate)
    const twoWeeksAgo = subDays(currentDate, 14)
    const sevenDaysAgo = subDays(currentDate, 7)



    return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
      
      if(!querySnapshot.metadata.hasPendingWrites){
      
      const uniqueDates = new Set()

      const list = [];
      const allList = [];
      const datesDict = {}
      const twoWeekDatesSet = new Set()
      const currentWeekStudiedSet = new Set()
      const pastSevenDaysSet = new Set()
      let count = 0
      let weekCount = 0
      let twoWeekCount = 0

      querySnapshot.forEach(doc => {

          const timeStamp = doc.get('timeStamp', { serverTimestamps: 'estimate' })
          const newDate = new Date(timeStamp.toDate())
          const newDateConverted = format(newDate, 'yyyy-MM-dd')
          let currentItem = {};
          currentItem.date = newDateConverted
          allList.push(currentItem)
        
          //check if date is within the current Week

         

          if(isWithinInterval(newDate, {start:startOfCurrentWeek, end:endOfCurrentWeek})){
            weekCount += 1
            currentWeekStudiedSet.add(newDateConverted)
          }

          if(isWithinInterval(newDate, {start:twoWeeksAgo, end:currentDate})){
            twoWeekCount += 1
            twoWeekDatesSet.add(newDateConverted)
          }

          if(isWithinInterval(newDate, {start:sevenDaysAgo, end:currentDate})){
            pastSevenDaysSet.add(newDateConverted)
            console.log('ran')
          }


          //check iof date is within current month and year
          if(isThisMonth(newDate) && isThisYear(newDate)){
            count +=1
          }

          if(newDateConverted in datesDict){
            datesDict[newDateConverted] += 1
          } else {
            datesDict[newDateConverted] = 1
          }
          


      });

     

      for (var date in datesDict) {
        let item = {};
        item.date = date; 
        list.push(item)
        uniqueDates.add(date)
     }

      setDatesStudiedPastSeven(pastSevenDaysSet)
  
      setAllDates(allList)
      setTimesStudied(querySnapshot.size)
      setTimesStudiedWeek(weekCount)
      setTimesStudiedTwoWeek(twoWeekCount)
      setTimesStudiedTwoWeeksUnique(twoWeekDatesSet.size)
      setTimesStudiedMonth(count)
      setDates(list);
      
      setUniqueDates(uniqueDates)


      setInitializing(false)

    }
  });
  
  }, []);

  if (initializing) {

    return null
  }

  return (<StudyStatsContext.Provider value={{datesStudiedPastSeven ,dates, uniqueDates, timesStudied, timesStudiedMonth, timesStudiedWeek, timesStudiedTwoWeek, timesStudiedTwoWeeksUnique, allDates}}>
    {props.children}
    </StudyStatsContext.Provider>
    );
 
}