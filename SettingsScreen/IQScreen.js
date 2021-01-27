import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { endOfDay, subDays , startOfDay, differenceInCalendarWeeks, format, differenceInDays, differenceInCalendarDays, subWeeks, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval, addDays, getDay} from 'date-fns'
import { UserDataContext } from '../UserDataContext'
import { Layout, Card, List, Text, Button, Icon, useTheme, Divider } from '@ui-kitten/components';
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ScrollView } from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { sessionsToHours } from '../helperFunctions';

import PushNotification from 'react-native-push-notification';


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

  const TimeComponent = (props) => {
    //borderBottomWidth:0.2, borderColor:theme['color-basic-300']
    return(
    
  /*   <View style={{  alignItems:'center', paddingVertical:20, borderTopWidth:0.7, borderTopColor:theme['color-basic-300'], marginHorizontal:-24, paddingHorizontal:24}}>
    <Text style={{fontSize:14,  marginBottom:4, fontWeight:'bold'}}>{props.title}</Text>
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:20}}>
    <Text style={{fontSize:10, color:theme['color-basic-600'], marginRight:4}}>{props.weekLabel}</Text>
    <Icon name='calendar-outline' fill={theme['color-basic-600']} height={11} width={11}/>
    </View>
    <View style={{justifyContent:"space-between", flexDirection:'row', width:'100%'}}>
    
    <View style={{flexDirection:'row', alignItems:'center', marginRight:20}}>
    <Text style={{marginRight:4,  fontSize:14, fontWeight:'bold'}}>{props.sessionCount} <Text style={{fontSize:11, color:theme['color-basic-600']}}>sessions</Text></Text>
    <Icon name='checkmark-circle-2' fill={theme['color-primary-300']} height={14} width={14}/>
    </View>


    
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{marginRight:8}}>{sessionsToHours(props.sessionCount)}</Text>
    <Icon name='clock' fill={theme['color-info-300']} height={14} width={14}/>
    </View>
    </View>

    </View> */

    <View style={{  flexDirection:'row',justifyContent:'space-between', paddingVertical:4, paddingTop:24, borderTopWidth:0.7, borderTopColor:theme['color-basic-300'], marginHorizontal:-24, paddingHorizontal:24}}>
    
    <View>
    <Text style={{fontSize:14,  marginBottom:8, fontWeight:'bold'}}>{props.title}</Text>
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:20}}>
    <Text style={{fontSize:10, color:theme['color-basic-600'], marginRight:4}}>{props.weekLabel}</Text>
    <Icon name='calendar-outline' fill={theme['color-basic-600']} height={11} width={11}/>
    </View>
    </View>

    <View style={{alignItems:'flex-end'}}>
    
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:8}}>
    <Text style={{marginRight:8,  fontSize:14, fontWeight:'bold'}}>{props.sessionCount} <Text style={{fontSize:11, color:theme['color-basic-600']}}>sessions</Text></Text>
    <Icon name='checkmark-circle-2' fill={theme['color-primary-300']} height={14} width={14}/>
    </View>


    
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{marginRight:8}}>{sessionsToHours(props.sessionCount)}</Text>
    <Icon name='clock' fill={theme['color-info-300']} height={14} width={14}/>
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

  useEffect(()=>{

    let currentWeekCount = 0
    let oneWeekAgoCount = 0
    let twoWeekAgoCount = 0

    allDateStats.forEach(element => {

      let newDate = new Date(element.date)

      if(isWithinInterval(newDate, {start:startOfCurrentWeek, end: endOfCurrentWeek})){
        currentWeekCount += 1
      } 
       
      if(isWithinInterval(newDate, {start:startOfWeekOneWeek, end: endOfWeekOneWeek})){
        oneWeekAgoCount += 1
      } 

      if(isWithinInterval(newDate, {start:startOfWeekTwoWeek, end:endOfWeekTwoWeek})){
        twoWeekAgoCount += 1
      }
      
    });

    setCurrentWeekCount(currentWeekCount)
    setOneWeekAgoCount(oneWeekAgoCount)
    setTwoWeekAgoCount(twoWeekAgoCount)

  
  },[allDateStats])


  const convertDateToString = (date) => {
    return format(date,'yyyy-MM-dd')
  }

  const getCurrentWeekLabel = () => {
      return format(startOfCurrentWeek,'MMM dd') + '  -  ' + format(endOfCurrentWeek,'MMM dd') 
  }


  const getLastWeekLabel = () => {
    return format(startOfWeekOneWeek,'MMM dd') + '  -  ' + format(endOfWeekOneWeek,'MMM dd')
  }


  const getTwoWeeksAgoLabel = () => {
    return format(startOfWeekTwoWeek,'MMM dd') + '  -  ' + format(endOfWeekTwoWeek,'MMM dd')
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
      fill: stepStatus == 'finished' ? theme['color-basic-600'] : null, //theme['color-danger-400']
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


  <Card style={{marginBottom:16, borderWidth:0.5, paddingBottom:0}}>

  <ImageBackground
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
        {/* <View style={{backgroundColor:theme['color-basic-100'], paddingVertical:8, paddingHorizontal:24, borderRadius:30, borderColor:theme['color-primary-400'], borderWidth:0, opacity:0.9}}>
        <Text category={'s1'} style={{fontSize:16, color:theme['color-basic-300']}}>Time Spent Studying</Text>
        </View> */} 
  </ImageBackground>

  <View style={{}}>
  <TimeComponent title={'Current Week'} sessionCount={currentWeekCount} weekLabel={getCurrentWeekLabel()}/>
  </View>

  <View>
  <TimeComponent title={'Last Week'} sessionCount={oneWeekAgoCount} weekLabel={getLastWeekLabel()}/>
  </View>
  <TimeComponent title={'Two Weeks Ago'} sessionCount={twoWeekAgoCount} weekLabel={getTwoWeeksAgoLabel()}/>
  {/* <TimeComponent title={'28 day Weekly Average'} sessionCount={11} weekLabel={get28DaysLabel()}/>
  <TimeComponent title={'Since Started Weekly Average'} sessionCount={8} weekLabel={getStartDateLabel()}/> */}
  </Card>



  {(calculateDaysSinceLastStudy() >= 28 || calculateDaysSinceStartedStudy() < 7) &&

  <Card style={{marginBottom:16, alignItems:'center' , borderWidth:0.5}}>
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

{/* calculateDaysSinceLastStudy() < 28 && calculateDaysSinceStartedStudy() > 7 */}
    
    {(calculateDaysSinceLastStudy() > 28 && calculateDaysSinceStartedStudy() > 7) &&
    <Card style={{marginBottom:16, alignItems:'center', borderWidth:0.5}}>
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
  current={convertDateToString(new Date())}
  minDate={'2020-05-10'}
  maxDate={'2021-01-31'}
  monthFormat={'MMMM'}
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
  theme={{
    textSectionTitleColor: theme['color-basic-900'],
    todayTextColor: theme['color-primary-800'],
    textMonthFontWeight: 'bold',
    textDayFontSize: 13,
    calendarBackground: theme['color-basic-100'],
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

   {/*  {(calculateDaysSinceLastStudy() > 28 && calculateDaysSinceStartedStudy() > 7) &&
    // for rendering the stats component
    } */}

  

   
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