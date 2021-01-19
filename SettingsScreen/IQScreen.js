import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { endOfDay, subDays , startOfDay, differenceInCalendarWeeks, format, differenceInDays, differenceInCalendarDays, subWeeks, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval, addDays, getDay} from 'date-fns'
import { UserDataContext } from '../UserDataContext'
import { Layout, Card, List, Text, Button, Icon, useTheme } from '@ui-kitten/components';
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ScrollView } from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'


const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const findVariance = (arr) => {

  let currentTotal = 0
  let lengthOfArray = arr.length
  let varianceTotal = 0

  arr.forEach(element => {
    currentTotal += element
  });

  let meanOfArr = currentTotal/lengthOfArray

  arr.forEach(element => {
    varianceTotal += Math.abs(meanOfArr - element) 
  })

  return varianceTotal/lengthOfArray

}


 

function IQScreen(){



  const theme = useTheme()
  const userData = useContext(UserDataContext)
  const studyStatsData = useContext(StudyStatsContext)
  const timesStudiedMonthStat = studyStatsData.timesStudiedMonth
  const timesStudiedTwoWeek = studyStatsData.timesStudiedTwoWeek
  const timesStudiedTwoWeeksUnique = studyStatsData.timesStudiedTwoWeeksUnique
  
  const uniqueDates = studyStatsData.uniqueDates

  const datesStudiedPastSeven = studyStatsData.datesStudiedPastSeven
  const sevenDaysCount = studyStatsData.pastSevenDaysCount

  const dateStats = studyStatsData.dates
  const userStartDate = userData.timeStamp
  const userStartStudyingDate = userData.startedStudying

  const allDateStats = studyStatsData.allDates
  
  const lastStudied = userData.lastStudied
  
  const lastWeekStudiedCount = studyStatsData.lastWeekStudiedCount
  const lastWeekStudiedSet = studyStatsData.lastWeekStudiedSet
  const currentWeekStudiedCount = studyStatsData.timesStudiedWeek
  const currentWeekStudiedSet = studyStatsData.currentWeekStudiedSet

  
  //need to refactor this 
  //const daysSinceLastStudy = differenceInDays(new Date(), startOfDay(userStartStudyingDate.toDate()))



  const calculateDaysSinceStartedStudy = () =>{

    if(userStartStudyingDate != null){
      return differenceInDays(new Date(), startOfDay(userStartStudyingDate.toDate()))
    } else {
      return 0
    }

  }

  const calculateCurrentPosition = () =>{

    if(userStartStudyingDate != null){
      let difference = differenceInDays(new Date(), startOfDay(userStartStudyingDate.toDate()))
      if(difference > 7){
        return 0
      } else {
        return difference
      }
    } else {
      return 0
    }

  }

  const calculateDaysSinceLastStudy = () =>{

    if(lastStudied != null){
      return differenceInDays(new Date(), startOfDay(lastStudied.toDate()))
    } else {
      return 99
    }

  }

  const todaysDate = new Date()
  const startOfToday = startOfDay(todaysDate)
  const endOfToday = endOfDay(todaysDate)
  const currentDayOfWeek = getDay(todaysDate)
  

  // if its greater than 14 days

  const convertDateToString = (date) => {
    return format(date,'yyyy-MM-dd')
  }




  const calculateStudyFrequency = () => {
    
    const weeklyFrequencyDict = { 0:0,1:0,2:0,3:0,4:0 }

    const weeklyFrequencyArr = []
    const startOfCurrentWeek = startOfWeek(startOfToday)
    const endOfCurrentWeek = endOfWeek(startOfToday)

    const sevenDaysAgo = subDays(startOfToday, 7)
    const eightDaysAgo = subDays(startOfToday, 8)
    const endOfDayEight = endOfDay(eightDaysAgo)
    //console.log('log', sevenDaysAgo, eightDaysAgo, endOfDayEight)
    const fourteenDaysAgo = subDays(startOfToday, 14)




    const oneWeekAgo = subWeeks(startOfToday, 1)
    const startOfWeekOneWeek = startOfWeek(oneWeekAgo)
    const endOfWeekOneWeek = endOfWeek(oneWeekAgo)

    const twoWeeksAgo = subWeeks(startOfToday, 2)
    const startOfWeekTwoWeek = startOfWeek(twoWeeksAgo)
    const endOfWeekTwoWeek = endOfWeek(twoWeeksAgo)

    const threeWeeksAgo = subWeeks(startOfToday, 3)
    const startOfWeekThreeWeek = startOfWeek(threeWeeksAgo)
    const endOfWeekThreeWeek = endOfWeek(threeWeeksAgo)

    const fourWeeksAgo = subWeeks(startOfToday, 4)
    const startOfWeekFourWeek = startOfWeek(fourWeeksAgo)
    const endOfWeekFourWeek = endOfWeek(fourWeeksAgo)
 
    let count = 0
    let monthlyAverage = 0
    let lastSevenDaysCount = 0
    let lastFourteenDaysCount = 0


    allDateStats.forEach(element => {

      let newDate = new Date(element.date)



      if(isWithinInterval(newDate, {start:sevenDaysAgo, end: endOfToday})){
        lastSevenDaysCount += 1
      } 
       
      if(isWithinInterval(newDate, {start:fourteenDaysAgo, end: eightDaysAgo})){
        lastFourteenDaysCount += 1
      } 

      if(isWithinInterval(newDate, {start:startOfCurrentWeek, end:endOfCurrentWeek})){
        weeklyFrequencyDict[0] += 1
        count += 1
        
      } else if(isWithinInterval(newDate, {start:startOfWeekOneWeek, end:endOfWeekOneWeek})){
        weeklyFrequencyDict[1] += 1
        count += 1

      } else if(isWithinInterval(newDate, {start:startOfWeekTwoWeek, end:endOfWeekTwoWeek})){
        weeklyFrequencyDict[2] += 1
        count += 1
      
      } else if(isWithinInterval(newDate, {start:startOfWeekThreeWeek, end:endOfWeekThreeWeek})){
        weeklyFrequencyDict[3] += 1
        count += 1
       
      } else if(isWithinInterval(newDate, {start:startOfWeekFourWeek, end:endOfWeekFourWeek})){
        weeklyFrequencyDict[4] += 1
        count += 1
       
      } 


    });


    for (const [key, value] of Object.entries(weeklyFrequencyDict)) {

        if(value != 0 && key != 0){
          weeklyFrequencyArr.push(value)
        }

    }

    let totalStudiedPastMonth = 0
    for (let x of weeklyFrequencyArr) {
      totalStudiedPastMonth += x
    }

    



    console.log( Math.floor(totalStudiedPastMonth/weeklyFrequencyArr.length))
    let percentageChangeLastSeven = lastSevenDaysCount/lastFourteenDaysCount
    let sevenDayAverage = lastSevenDaysCount/7



  return count/8
  

  }
      
  
  // the glitch is that the color is messed up 

  const newFunction = () => {

    let _userStartDate = new Date(userStartDate.toDate())
    let _userStartDateBegin = startOfDay(_userStartDate)
    let userStartedStudying = new Date(userStartStudyingDate.toDate())
    //with this number we can find the how far from the benchmark date
    

    let differenceInStartDays = differenceInDays(todaysDate, userStartedStudying)
    let sevenDaysAfterStart = addDays(_userStartDate, 6)
    let userStartWeek = eachDayOfInterval({start:_userStartDate, end:sevenDaysAfterStart})

    //to get the current week get look the at interval at the start of the current week to the end of today


   let startOfStartedStudyingWeek = startOfWeek(userStartedStudying)

    /* if(isWithinInterval(newDate, {start:startOfCurrentWeek, end:endOfCurrentWeek})){
      weekCount += 1
      currentWeekStudiedSet.add(newDateConverted)
    } */
    
    let diffInWeeks = differenceInCalendarWeeks(todaysDate, userStartedStudying)

    const newDict = {}

    /* uniqueDates.forEach(element => {
      console.log(element)
      
    }); */


/*  const startDate = startOfDay(userStartStudyingDate.toDate())
    const endDate = addDays(startDate, 6)
    const daysInWeek = eachDayOfInterval({start:startDate, end:endDate})
    const stringConvertedDates = []

    daysInWeek.forEach(item => stringConvertedDates.push(format(item,'yyyy-MM-dd')))
    
    uniqueDates.forEach(item => newDict[item] = {selected:true}) */
    
    //14.3 is the approximate change in 1 day
    // How much of a percent change per score - 

    let averageLastWeekStudied = lastWeekStudiedCount/7
    let averageLastWeekStudiedUnique = lastWeekStudiedSet.size/7

    let averageCurrentWeekStudied = currentWeekStudiedCount/(currentDayOfWeek + 1)
    let averageCurrentWeekStudiedUnique = currentWeekStudiedSet.size/(currentDayOfWeek + 1)
    // 
    console.log(averageLastWeekStudied, averageLastWeekStudiedUnique, averageCurrentWeekStudied, averageCurrentWeekStudiedUnique)

    
    //is it fair to use 
    //get the last seven days of study or all the days of study at this point
    //console.log(userStartWeek)
   
  }

  const returnMarkedDates = () => {
    const newDict = {}
    uniqueDates.forEach(item => newDict[item] = {
      customStyles: {
        container: {
          backgroundColor: theme['color-primary-100'],
          
        },
        text: {
          color:theme['color-primary-800'],
          fontWeight:'bold',
          
        }
      }
    })
    return newDict
  }



  const returnLabels = (number) => {

    const addedDates = 0 + number
    let startDate = todaysDate

    if(userStartStudyingDate != null){
      if(differenceInDays(new Date(), startOfDay(userStartStudyingDate.toDate())) < 8){
        startDate = startOfDay(userStartStudyingDate.toDate())
      }
    }

    const startDateAdded = addDays(startDate, addedDates)
    const endDate = addDays(startDate, 6 + addedDates)
    const daysInWeek = eachDayOfInterval({start:startDateAdded, end:endDate})
    const stringConvertedDates = []
    daysInWeek.forEach(item => stringConvertedDates.push(format(item,'M-dd')))
    return stringConvertedDates
  }



 


  const customStyles = {
    
    stepIndicatorSize: 35,
    currentStepIndicatorSize:35,
    separatorStrokeWidth:35,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: theme['color-primary-500'],
    stepStrokeWidth: 1.5,
    stepStrokeFinishedColor: theme['color-primary-200'],
    stepStrokeUnFinishedColor: theme['color-basic-400'],
    separatorFinishedColor: theme['color-primary-200'],
    separatorUnFinishedColor: theme['color-basic-400'],
    stepIndicatorFinishedColor: theme['color-primary-200'],
    stepIndicatorUnFinishedColor: theme['color-basic-400'],
    stepIndicatorCurrentColor: theme['color-primary-200'],
    
    stepIndicatorLabelCurrentColor: 'red',
    stepIndicatorLabelFinishedColor: 'green',
    stepIndicatorLabelUnFinishedColor: 'red',
    labelColor: theme['color-basic-600'],
    labelSize: 9,
    currentStepLabelColor: theme['color-primary-700']

  }



  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {

    let startDate = todaysDate

    if(userStartStudyingDate != null){
      startDate = startOfDay(userStartStudyingDate.toDate())
    }

    const endDate = addDays(startDate, 6)
 
    const daysInWeek = eachDayOfInterval({start:startDate, end:endDate})

    const iconConfig = {
      name: 'close-outline',
      fill: stepStatus == 'finished' ? theme['color-basic-400'] : null, //theme['color-danger-400']
      width:16,
      height:16
    };





    switch (position) {
      case 0: {

        if(datesStudiedPastSeven.has(format(daysInWeek[0], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 20
          iconConfig.width = 20
        }
        break;

      }

      case 1: {

        if(datesStudiedPastSeven.has(format(daysInWeek[1], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 20
          iconConfig.width = 20
        }
        break;

    
      }

      case 2: {

        if(datesStudiedPastSeven.has(format(daysInWeek[2], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 20
          iconConfig.width = 20
        }
        break;

      }

      case 3: {

        if(datesStudiedPastSeven.has(format(daysInWeek[3], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 20
          iconConfig.width = 20
        }
        break;

      }

      case 4: {

        if(datesStudiedPastSeven.has(format(daysInWeek[4], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 20
          iconConfig.width = 20
        }
        break;

      }

      case 5: {

        if(datesStudiedPastSeven.has(format(daysInWeek[5], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 20
          iconConfig.width = 20
        }
        break;

      }

      case 6: {

        if(datesStudiedPastSeven.has(format(daysInWeek[6], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 20
          iconConfig.width = 20
        }
        break;

      }

      default: {
        break;
      }
    }
    return iconConfig;
  };


  const renderStepIndicator = (params) => (
    <Icon {...getStepIndicatorIconConfig(params)}/>
  );
//(calculateDaysSinceLastStudy() >= 28 || calculateDaysSinceStartedStudy() < 7) - check these condtiona what id its exact 14 days? - if days since last studied
//(calculateDaysSinceLastStudy() < 28 && calculateDaysSinceStartedStudy() > 7) - Condition for showing strength score
  return (


  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:800}}>
  <SafeAreaView style={{flex: 1}}>

  <Layout level='2' style={{flex:1, padding:16}}>

  {(calculateDaysSinceLastStudy() >= 28 || calculateDaysSinceStartedStudy() < 7) &&

  <Card onPress={calculateDaysSinceLastStudy} style={{marginBottom:16, alignItems:'center' , borderWidth:0.5}}>
  <Image
    style={{
      height:120,
      width:400,
      marginBottom:28,
      marginTop:-16,
    }}
    source={require('../assets/images/calendarmark.png')}
  />


   <View style={{ justifyContent:'center', alignItems:'center'}}>
   <Text category={'h6'}>Your Benchmark</Text>
   <Text style={{marginTop:12, marginBottom:24,letterSpacing:0.2, lineHeight:24,color:theme['color-basic-600'], textAlign:'center', marginHorizontal:32}}>Learning is about consistency. It's crucial to study over periods of days. The first seven days will serve as a benchmark for improvement.</Text>
   </View> 

   {/*  <Text category='c2' style={{alignSelf:'center', fontSize:11, color:theme['color-basic-600']}}> {daysSinceStartStudying >= 6 ? 'Last day' : 6-daysSinceStartStudying + "days left"}</Text> */}

    <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-around', marginBottom:40}}>
    <View style={{alignItems:'center'}}>
    <Text category='h4'>{datesStudiedPastSeven.size}</Text>
    <Text style={{fontSize:11, color:theme['color-basic-600']}}>days studied</Text>
    </View>
    <View style={{alignItems:'center'}}>
    <Text category='h4'>{sevenDaysCount}</Text> 
    <Text style={{fontSize:11, color:theme['color-basic-600']}}>total sessions</Text>
    </View>
    </View>

    <View style={{marginHorizontal:32, marginBottom:32}}>
    <StepIndicator
         customStyles={customStyles}
         currentPosition={calculateCurrentPosition()}
         stepCount={7}
         renderStepIndicator={renderStepIndicator}
         labels={returnLabels(0)}
        
    />
    </View>
    </Card>

    }

  
    
    {(calculateDaysSinceLastStudy() < 28 && calculateDaysSinceStartedStudy() > 7) &&
    <Card onPress={()=>calculateStudyFrequency()} style={{marginBottom:16, alignItems:'center', borderWidth:0.5}}>
     <Image
          style={{
            height:120,
            width:410,
            marginBottom:28,
            marginTop:-16,
            marginLeft:-24
            
          }}
  
          source={require('../assets/images/womenthinking.png')}
        />

   <View style={{ alignItems:'center', justifyContent:'center'}}>
   <Text category={'h6'}>Study Score</Text>
   <Text style={{marginTop:12, marginBottom:24,letterSpacing:0.2, lineHeight:24,color:theme['color-basic-600'], textAlign:'center', marginHorizontal:12 }}>Study score is a measure on how well you are studying. It takes your consistency and improvement into consideration</Text>
   </View> 


   <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-around', marginBottom:40}}>
   <View style={{alignItems:'center'}}>
   <Text category='h4'>{datesStudiedPastSeven.size}</Text>
   <Text style={{fontSize:11, color:theme['color-basic-600']}}>Recommended Days Studied</Text>
   <Text style={{fontSize:11, color:theme['color-basic-600']}}>Per Week</Text>
   </View>
   <View style={{alignItems:'center'}}>
   <Text category='h4'>{sevenDaysCount}</Text> 
   <Text style={{fontSize:11, color:theme['color-basic-600']}}>Recommended Sessions</Text>
   <Text style={{fontSize:11, color:theme['color-basic-600']}}>Per Day</Text>
   </View>
   </View>
   </Card>
    }


  

  <Card disabled={true} style={{marginBottom:12, paddingTop:12, paddingBottom:24, borderWidth:0.5}}>
  <Calendar

  markingType={'custom'}
  markedDates={returnMarkedDates()}
  // Initially visible month. Default = Date()
  current={convertDateToString(new Date())}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2020-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2021-01-31'}
  monthFormat={'MMMM'}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow={(direction) => (direction == 'left' ? <View><Icon fill={theme['text-basic-color']} height={15} width={15}  name='arrow-ios-back-outline'/></View> 
  : <View><Icon fill={theme['text-basic-color']} height={15} width={15}  name='arrow-ios-forward-outline'/></View>)}
  
  hideExtraDays={false}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={0}
  // Hide day names. Default = false
  hideDayNames={false}
  // Show week numbers to the left. Default = false
  showWeekNumbers={false}
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter.
  // Enable the option to swipe between months. Default = false
  //enableSwipeMonths={true}
  futureScrollRange={0}
  theme={{
    textSectionTitleColor: theme['color-basic-900'],
    todayTextColor: theme['color-primary-800'],
    textMonthFontWeight: 'bold',
    
    textDayFontSize: 13,
  
    calendarBackground: theme["background-basic-color-1"],
    calendarHeaderStyle:{
      color:'green'
    },
    textMonthFontSize: 18,
    textDayHeaderFontSize: 13,
    textDayHeaderFontFamily:'OpenSans-Bold',
    textDayFontFamily:'OpenSans-Regular',
    textDayStyle:{
      marginTop:6
    }
  }}
    />
    </Card>

   
    </Layout>
    </SafeAreaView>
    </ScrollView>
      
      );

    
    }

export default IQScreen

const styles = StyleSheet.create({
  image: {
    flex: 1,
    margin:-40,
    padding:40,
 
  },


});