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
 
  const [timesStudiedToday, setTimesStudiedToday] = React.useState(0);
  const [timesStudiedWeek, setTimesStudiedWeek] = React.useState(0);

  const [totalMinutesStudied, setTotalMinutesStudied] = React.useState(0);


  const [currentWeekStudiedSet, setCurrentWeekStudiedSet] = React.useState(0);
  const [allDates, setAllDates] = React.useState(0);
  const [uniqueDates, setUniqueDates] = React.useState(0);


  const [allDatesDict, setAllDatesDict] = React.useState(0);



  //stats by week over week



  //stats by days


  
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID).collection('DatesStudied')
    
    const currentDate = new Date()
    const endOfCurrentDate = endOfDay(currentDate) 
    const startOfCurrentDate = startOfDay(currentDate)

    const startOfCurrentWeek = startOfDay(startOfWeek(currentDate))
    const endOfCurrentWeek = endOfDay(endOfWeek(currentDate))
    
    const twoWeeksAgo = startOfDay(subDays(currentDate, 14))
    const sixDaysAgo = startOfDay(subDays(currentDate, 6))

    const sevenDaysAgo = subDays(sixDaysAgo, 1)
    const startOfLastWeek = startOfDay(startOfWeek(sevenDaysAgo))
    const endOfLastWeek = endOfDay(endOfWeek(sevenDaysAgo))




    // if we want to count today then we should subtract 6 days
    // if we dont want to count today then we should subtract 7 days

    return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
    
      if(!querySnapshot.metadata.hasPendingWrites){
      
      const uniqueDates = new Set()

      const list = [];
      const allList = [];
      const datesDict = {}

      const currentWeekStudySet = new Set()
      const pastSevenDaysSet = new Set()
      let sevenDaysCount = 0
      let weekCount = 0
      let todayCount = 0

      let totalMinutesStudied = 0

 
      querySnapshot.forEach(doc => {

          const timeStamp = doc.get('timeStamp', { serverTimestamps: 'estimate' })
          const minutesStudied = doc.get('minutesStudied')
          const newDate = new Date(timeStamp.toDate())
          const newDateConverted = format(newDate, 'yyyy-MM-dd')
          let currentItem = {};
          currentItem.minutesStudied = parseInt(minutesStudied)
          currentItem.date = newDate
          allList.push(currentItem)
        
          //check if date is within the current Week
          totalMinutesStudied += parseInt(minutesStudied)
        
          //____Stats for this week vs last week
        

          if(isWithinInterval(newDate, {start:startOfCurrentWeek, end:endOfCurrentWeek})){

            if(isWithinInterval(newDate, {start:startOfCurrentDate, end:endOfCurrentDate})){
              todayCount += 1
            }

            weekCount += 1
            currentWeekStudySet.add(newDateConverted)
          }

          if(isWithinInterval(newDate, {start:sixDaysAgo, end:endOfCurrentDate})){
            pastSevenDaysSet.add(newDateConverted)
            sevenDaysCount += 1
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

      setTimesStudiedToday(todayCount)

      setAllDates(allList)
      setTimesStudied(querySnapshot.size)
      setTimesStudiedWeek(weekCount)
      setDates(list);
      setCurrentWeekStudiedSet(currentWeekStudySet)
  
      setUniqueDates(uniqueDates)


      setTotalMinutesStudied(totalMinutesStudied)

      setAllDatesDict(datesDict)
      setInitializing(false)

      
    }
  });
  
  }, []);

  if (initializing) {

    return null
  }

  return (<StudyStatsContext.Provider value={{allDatesDict ,totalMinutesStudied,timesStudiedToday,currentWeekStudiedSet,pastSevenDaysCount,datesStudiedPastSeven ,dates, uniqueDates, timesStudied, timesStudiedWeek, allDates}}>
    {props.children}
    </StudyStatsContext.Provider>
    );
 
}