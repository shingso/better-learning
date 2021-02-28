import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Image, Dimensions } from 'react-native'

import { endOfDay, startOfDay, endOfMonth, format, differenceInDays, differenceInCalendarDays, subWeeks, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval, addDays, getDay, startOfMonth, maxTime} from 'date-fns'
import { UserDataContext } from '../UserDataContext'
import { Layout, Card, List, Text, Button, Icon, useTheme, Divider } from '@ui-kitten/components';
import { StudyStatsContext } from '../StudyStats'

import { ScrollView } from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';
import { Calendar } from 'react-native-calendars'
import { formatMinutes2 } from '../helperFunctions';





function IQScreen(){

 

  const todaysDate = new Date()
  const startOfToday = startOfDay(todaysDate)
  const endOfToday = endOfDay(todaysDate)
  const currentDayOfWeek = getDay(todaysDate)
  
  const startOfCurrentWeek = startOfWeek(startOfToday)
  const endOfCurrentWeek = endOfWeek(startOfToday)
  // if its greater than 14 days

  const oneWeekAgo = subWeeks(startOfToday, 1)
  const startOfWeekOneWeek = startOfWeek(oneWeekAgo)
  const endOfWeekOneWeek = endOfWeek(oneWeekAgo)

  const twoWeekAgo = subWeeks(startOfToday, 2)
  const startOfWeekTwoWeek = startOfWeek(twoWeekAgo)
  const endOfWeekTwoWeek = endOfWeek(twoWeekAgo)

  const [currentWeekCount, setCurrentWeekCount] = useState(0)
  const [oneWeekAgoCount, setOneWeekAgoCount] = useState(0)
  const [twoWeekAgoCount, setTwoWeekAgoCount] = useState(0)


  const [currentWeekMinutesStudied, setCurrentWeekMinutesStudied] = useState(0)
  const [oneWeekAgoMinutesStudied, setOneWeekAgoMinutesStudied] = useState(0)
  const [twoWeekAgoMinutesStudied , setTwoWeekAgoMinutesStudied ] = useState(0)

  const theme = useTheme()
  const userData = useContext(UserDataContext)
  const studyStatsData = useContext(StudyStatsContext)

  const uniqueDates = studyStatsData.uniqueDates

  const datesStudiedPastSeven = studyStatsData.datesStudiedPastSeven
  const sevenDaysCount = studyStatsData.pastSevenDaysCount
  const dateStats = studyStatsData.dates
  const userStartDate = userData.timeStamp
  const userStartStudyingDate = userData.startedStudying

  const allDateStats = studyStatsData.allDates
  const allDatesDict = studyStatsData.allDatesDict
  const lastStudied = userData.lastStudied
  
  const currentWeekStudiedCount = studyStatsData.timesStudiedWeek
  const currentWeekStudiedSet = studyStatsData.currentWeekStudiedSet

  const screenWidth = Dimensions.get('window').width
  //need to refactor this 
  //const daysSinceLastStudy = differenceInDays(new Date(), startOfDay(userStartStudyingDate.toDate()))

 


 const TimeComponent = (props) => {
  //borderBottomWidth:0.2, borderColor:theme['color-basic-300']

  const maxBarWidth = screenWidth - 104

  const maxTimeStudied = Math.max(currentWeekMinutesStudied, oneWeekAgoMinutesStudied)
  const amountOfBar = props.minutesStudied/maxTimeStudied
  let barWidth = maxBarWidth * amountOfBar
  if(!(isFinite(barWidth)) || barWidth < 10){
    barWidth = 5
  }
  
  return(
  
  <View style={{  flexDirection:'row',justifyContent:'space-between', paddingVertical:4, paddingVertical:24}}>
  <View>
  
  <Text style={{ marginBottom:12, fontFamily:'OpenSans-Bold', fontWeight:'800'}}>{props.title}</Text>
  
  <View style={{flexDirection:'row', alignItems:'center', marginBottom:8}}>
  <Text style={{marginRight:8, fontWeight:'500', fontSize:14, fontFamily:'OpenSans-SemiBold'}}>{props.sessionCount} 
  <Text style={{color:theme['color-basic-600'], fontSize:12}}> sessions for a total of</Text>
  </Text>
  </View>

  <Text style={{marginRight:8, marginBottom:4}}>{formatMinutes2(props.minutesStudied)}</Text>
  <View style={{flexDirection:'row', alignItems:'center'}}>
  <View style={{height:14, backgroundColor:props.barColor, borderRadius:4, width:barWidth, marginRight:8}}></View> 
  <Icon name='clock'  fill={props.barColor} height={16} width={16}/>
  </View>
  </View>
  </View>

  )
}
   

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

  
  useEffect(()=>{

    let currentWeekCount = 0
    let oneWeekAgoCount = 0
    let twoWeekAgoCount = 0

    let currentWeekMinutesStudied = 0
    let oneWeekAgoMinutesStudied = 0
    let twoWeekAgoMinutesStudied = 0

    allDateStats.forEach(element => {

      let newDate = new Date(element.date)

      if(isWithinInterval(newDate, {start:startOfCurrentWeek, end: endOfCurrentWeek})){
        currentWeekCount += 1
        currentWeekMinutesStudied += element.minutesStudied
      } 
       
      if(isWithinInterval(newDate, {start:startOfWeekOneWeek, end: endOfWeekOneWeek})){
        oneWeekAgoCount += 1
        oneWeekAgoMinutesStudied += element.minutesStudied
      } 

      if(isWithinInterval(newDate, {start:startOfWeekTwoWeek, end:endOfWeekTwoWeek})){
        twoWeekAgoCount += 1
        twoWeekAgoMinutesStudied  += element.minutesStudied
      }
      
    });

    setCurrentWeekCount(currentWeekCount)
    setOneWeekAgoCount(oneWeekAgoCount)
    setTwoWeekAgoCount(twoWeekAgoCount)

    setCurrentWeekMinutesStudied(currentWeekMinutesStudied)
    setOneWeekAgoMinutesStudied(oneWeekAgoMinutesStudied)
    setTwoWeekAgoMinutesStudied(twoWeekAgoMinutesStudied)


  
  },[allDateStats])


  const convertDateToString = (date) => {
    return format(date,'yyyy-MM-dd')
  }




  const getCurrentWeekLabel = () => {
      return format(startOfCurrentWeek,'MMMM dd') + '  -  ' + format(endOfCurrentWeek,'MMMM dd') 
  }


  const getLastWeekLabel = () => {
    return format(startOfWeekOneWeek,'MMMM dd') + '  -  ' + format(endOfWeekOneWeek,'MMMM dd')
  }


  const getTwoWeeksAgoLabel = () => {
    return format(startOfWeekTwoWeek,'MMMM dd') + '  -  ' + format(endOfWeekTwoWeek,'MMMM dd')
  }



  const returnMarkedDates = () => {
    const newDict = {}
    console.log(uniqueDates)
    uniqueDates.forEach(item => 
      newDict[item] = {selected:true, selectedColor:theme['color-primary-400']}
      
    )

    console.log(newDict)

   
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
    
    stepIndicatorSize: 45,
    currentStepIndicatorSize:45,
    separatorStrokeWidth:45,
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
    labelSize: 11,
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
      fill: stepStatus == 'finished' ? theme['color-basic-500'] : null, //theme['color-danger-400']
      width:18,
      height:18
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




  {(true) &&

  <Card  style={{marginBottom:16, alignItems:'center' , borderWidth:0, borderRadius:12}}>
  <Image
    style={{
      height:120,
      width:400,
      marginBottom:28,
      marginTop:-16,
    }}
    source={require('../assets/images/firstweekv5.png')}
  />

   <View style={{ justifyContent:'center', alignItems:'center'}}>
   <Text category={'h6'}>The process of learning</Text>
   <Text 
   style={{marginTop:12, marginBottom:20,letterSpacing:0.2, lineHeight:24,color:theme['color-basic-700'], textAlign:'center', marginHorizontal:32}}>
   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
   </Text>
   </View> 

   {/* //datesStudiedPastSeven.size  <Text category='c2' style={{alignSelf:'center', fontSize:11, color:theme['color-basic-600']}}> {daysSinceStartStudying >= 6 ? 'Last day' : 6-daysSinceStartStudying + "days left"}</Text> */}

    <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-around', marginBottom:40}}>
    <View style={{alignItems:'center'}}>
    <Text style={{fontSize:40, fontWeight:'500',fontFamily:'OpenSans-SemiBold'}}>{datesStudiedPastSeven.size}</Text>
    <Text style={{fontSize:13, color:theme['color-basic-700'], letterSpacing:0.2}}>Days Studied</Text>
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



<Card style={{marginBottom:12, borderWidth:0, paddingBottom:0, borderRadius:12}}>
{/* <ImageBackground
       style={{
         height:120,
         width:410,
         marginBottom:0,
         marginTop:-16,
         marginLeft:-24,
         justifyContent:'center',
         alignItems:'center'
      
         
       }}

       source={require('../assets/images/piggytime.png')}
     >
  </ImageBackground> */}
  
  <View style={{ justifyContent:'center', alignItems:'center', marginTop:28, marginBottom:8}}>
   <Text category={'h6'}>Time spent studying</Text>
   <Text 
   style={{marginTop:8, marginBottom:4,letterSpacing:0.2, lineHeight:24,color:theme['color-basic-700'], textAlign:'center'}}>
   Your are on track to reaching last weeks time studied!
   </Text>
   </View> 

  <Text></Text>

  <View style={{borderTopColor:theme['color-basic-400'], borderTopWidth:0.6}}>
  <TimeComponent title={'This week'} minutesStudied={currentWeekMinutesStudied} sessionCount={currentWeekCount} weekLabel={getCurrentWeekLabel()} barColor={theme['color-primary-300']}/>
  </View>
  
  {calculateDaysSinceStartedStudy() > 7 &&
  <View>
  <TimeComponent title={'Last week'} minutesStudied={oneWeekAgoMinutesStudied} sessionCount={oneWeekAgoCount}  weekLabel={getLastWeekLabel()} barColor={theme['color-basic-400']}/>
  </View>

  }
  {/* {calculateDaysSinceStartedStudy() > 14 &&
  <View style={{borderTopColor:theme['color-basic-400'], borderTopWidth:0.6}}>
  <TimeComponent title={'Two Weeks Ago'} minutesStudied={twoWeekAgoMinutesStudied} sessionCount={twoWeekAgoCount} weekLabel={getTwoWeeksAgoLabel()}/>
  </View>
  }  */}
  </Card>




  

  <Card disabled={true} style={{marginBottom:12, paddingTop:12, paddingBottom:24, borderWidth:0, borderRadius:12}}>
  <Calendar

  //markingType={'custom'}
  markedDates={returnMarkedDates()}
  current={convertDateToString(new Date())}
  minDate={convertDateToString(startOfMonth(userStartDate.toDate()))}
  maxDate={convertDateToString(endOfMonth(new Date()))}
  monthFormat={'MMMM yyyy'}
  renderArrow={(direction) => (direction == 'left' ? <View><Icon fill={theme['text-basic-color']} height={15} width={15}  name='arrow-ios-back-outline'/></View> 
  : <View><Icon fill={theme['text-basic-color']} height={15} width={15}  name='arrow-ios-forward-outline'/></View>)}
  hideExtraDays={false}
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={0}
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter.
  // Enable the option to swipe between months. Default = false
  futureScrollRange={0}
  enableSwipeMonths={true}


  theme={{
    //WeekDay Label - Sun/Mon/Tues
    textSectionTitleColor: theme['color-basic-900'],

    todayTextColor: theme['color-primary-800'],
    textDayFontSize: 13,
    calendarBackground: null,
    
    //Month Styling - January/Feburary
    textMonthFontSize: 18,
    monthTextColor:theme['color-basic-800'],
    textMonthFontWeight: 'bold',

    

    textDayHeaderFontSize: 13,
    textDayHeaderFontFamily:'OpenSans-SemiBold',
    //textDayFontFamily:'OpenSans-Regular',
    textDisabledColor:theme['color-basic-400'],


    textDayStyle:{
      marginTop:Platform.OS ==='ios' ? 8 : 7,
      color: theme['text-basic-color'],//'purple'//theme['text-basic-color']
      fontFamily:'OpenSans-SemiBold'
    }
  }}
    />
    </Card>

   {/*  {(calculateDaysSinceLastStudy() > 28 && calculateDaysSinceStartedStudy() > 7) &&
    // for rendering the stats component
    } */}

  

   
    </Layout>
    </SafeAreaView>
    </ScrollView>
      
      );

    
    }

export default IQScreen
