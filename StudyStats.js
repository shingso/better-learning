import React, { useState, useEffect, createContext, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext'
import { format, isThisMonth, isThisYear, startOfWeek, endOfWeek, isWithinInterval, subDays, endOfDay, startOfDay } from 'date-fns'

export const StudyStatsContext = createContext(null)

export function StudyStatsContextWrapper(props) {

  const authContext = useContext(AuthContext)
  const userID = authContext.user.uid
  const [initializing, setInitializing] = useState(true)
  const [dates, setDates] = React.useState([]);
  const [timesStudied, setTimesStudied] = React.useState(0);

  const [datesStudiedPastSeven, setDatesStudiedPastSeven] = React.useState(0);
  const [pastSevenDaysCount, setPastSevenDaysCount] = React.useState(0);

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
    const endOfCurrentDate = endOfDay(currentDate) 

    const startOfCurrentWeek = startOfDay(startOfWeek(currentDate))
    const endOfCurrentWeek = endOfDay(endOfWeek(currentDate))
    const twoWeeksAgo = startOfDay(subDays(currentDate, 14))
    const sevenDaysAgo = startOfDay(subDays(currentDate, 6))

    // if we want to count today then we should subtract 6 days
    // if we dont want to count today then we should subtract 7 days

    return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
      
      if(!querySnapshot.metadata.hasPendingWrites){
      
      const uniqueDates = new Set()

      const list = [];
      const allList = [];
      const datesDict = {}
      const twoWeekDatesSet = new Set()
      const currentWeekStudiedSet = new Set()
      const pastSevenDaysSet = new Set()
      let sevenDaysCount = 0
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

          if(isWithinInterval(newDate, {start:sevenDaysAgo, end:endOfCurrentDate})){
            pastSevenDaysSet.add(newDateConverted)
            sevenDaysCount += 1
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

      setPastSevenDaysCount(sevenDaysCount)


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

  return (<StudyStatsContext.Provider value={{pastSevenDaysCount,datesStudiedPastSeven ,dates, uniqueDates, timesStudied, timesStudiedMonth, timesStudiedWeek, timesStudiedTwoWeek, timesStudiedTwoWeeksUnique, allDates}}>
    {props.children}
    </StudyStatsContext.Provider>
    );
 
}