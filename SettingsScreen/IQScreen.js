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


  const [currentWeekCount, setCurrentWeekCount] = useState(0)
  const [oneWeekAgoCount, setOneWeekAgoCount] = useState(0)
  const [currentWeekMinutesStudied, setCurrentWeekMinutesStudied] = useState(0)
  const [oneWeekAgoMinutesStudied, setOneWeekAgoMinutesStudied] = useState(0)
  const theme = useTheme()
  const userData = useContext(UserDataContext)
  const studyStatsData = useContext(StudyStatsContext)
  const uniqueDates = studyStatsData.uniqueDates
  const datesStudiedPastSeven = studyStatsData.datesStudiedPastSeven
  const userStartDate = userData.timeStamp


  const allDateStats = studyStatsData.allDates


  const screenWidth = Dimensions.get('window').width



  const timeStudiedMessage = () =>{
    const textStyle={
      alignSelf:'center', 
      fontFamily:'Poppins-SemiBold', 
      fontSize:14,
      lineHeight:26
    }
    const lastWeekMinutesAverage = oneWeekAgoMinutesStudied/7
    const currentWeekMinutesAverage = currentWeekMinutesStudied/currentDayOfWeek + 1

  
    if(currentWeekMinutesStudied == 0){
      return <Text style={{...textStyle}}>You haven't studied yet this week <Icon name={'alert-circle-outline'} style={{marginBottom:-3}} fill={theme['color-primary-700']} width={18} height={18}/></Text>
    }

    if(currentWeekMinutesAverage > lastWeekMinutesAverage + (lastWeekMinutesAverage * .1)){
      return <Text style={{...textStyle}}>You're studying alot more this week than last week. <Icon name={'trending-up'} style={{marginBottom:-3}} fill={theme['color-primary-700']} width={18} height={18}/></Text>
    }

    if(currentWeekMinutesAverage > lastWeekMinutesAverage - (lastWeekMinutesAverage * .2)){
      return <Text style={{...textStyle}}>Your studying at a good pace to match last week. <Icon name={'trending-up'} style={{marginBottom:-3}} fill={theme['color-primary-700']} width={18} height={18}/></Text>
    }


    if(currentWeekMinutesAverage < lastWeekMinutesAverage){
      return <Text style={{...textStyle}}>Find a pace that is sustainable. <Icon name={'trending-down'} style={{marginBottom:-3}} fill={theme['color-primary-700']} width={18} height={18}/></Text>
    }

  }


  const calculateCurrentPosition = () =>{

    if(userStartDate != null){
      let difference = differenceInDays(new Date(), startOfDay(userStartDate.toDate()))
      if(difference > 7){
        return 0
      } else {
        return difference
      }
    } else {
      return 0
    }

  }




  
  useEffect(()=>{

    let currentWeekCount = 0
    let oneWeekAgoCount = 0

    let currentWeekMinutesStudied = 0
    let oneWeekAgoMinutesStudied = 0


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


      
    });

    setCurrentWeekCount(currentWeekCount)
    setOneWeekAgoCount(oneWeekAgoCount)
    setCurrentWeekMinutesStudied(currentWeekMinutesStudied)
    setOneWeekAgoMinutesStudied(oneWeekAgoMinutesStudied)



  
  },[allDateStats])


  const convertDateToString = (date) => {
    return format(date,'yyyy-MM-dd')
  }


  const TimeComponent = (props) => {

    const maxBarWidth = screenWidth - 112
    const maxTimeStudied = Math.max(currentWeekMinutesStudied, oneWeekAgoMinutesStudied)
    const amountOfBar = props.minutesStudied/maxTimeStudied
    let barWidth = maxBarWidth * amountOfBar
    if(!(isFinite(barWidth)) || barWidth < 10){
      barWidth = 6
    }

    return(
    
    <View style={{marginTop:32}}>
    <Text style={{color:props.titleColor, fontSize:12}} category='h6'>{props.title}</Text>

    <View style={{marginTop:0}}>
    <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between' }}>
    <Text style={{marginBottom:-7}}>{formatMinutes2(props.minutesStudied, theme['color-basic-800'], theme['color-basic-700'], 12, 32)}</Text>
    {/*     <Text style={{marginBottom:8, color:theme['color-basic-400']}}>  /  </Text> */}
    <Text style={{ fontSize:20, fontFamily:'Poppins-SemiBold',color:theme['color-basic-900'], fontWeight:'500'}}>{props.sessionCount} <Text style={{fontSize:10, fontFamily:'Poppins-Regular', color:theme['color-basic-700']}}>sessions</Text></Text>
    </View>
    
    <View style={{flexDirection:'row', alignItems:'center', marginTop:Platform.OS === 'ios' ? 8 : -4}}>
    <View style={{height:20, backgroundColor:props.barColor, borderRadius:4, width:barWidth, marginRight:8,  justifyContent:'center'}}>
    </View> 
    <Icon name='clock'  fill={props.barColor} height={22} width={22}/>
    </View>
    </View>

    </View>
  
    )
  }




  const returnMarkedDates = () => {
    const newDict = {}
    uniqueDates.forEach(item => 
      newDict[item] = {selected:true, selectedColor:theme['color-primary-400']}
      
    )
    return newDict
  }


  const returnLabels = () => {


    let startDate = userStartDate.toDate()
    const endDate = addDays(startDate, 6)
    const daysInWeek = eachDayOfInterval({start:startDate, end:endDate})
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
    currentStepLabelColor: theme['color-primary-700'],
    labelFontFamily:"Poppins-SemiBold"
  }






  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {

    let startDate = userStartDate.toDate()
    const endDate = addDays(startDate, 6)
    const daysInWeek = eachDayOfInterval({start:startDate, end:endDate})
    const iconConfig = {
      name: 'close-outline',
      fill: stepStatus == 'finished' ? null : null, //theme['color-danger-400']
      width:18,
      height:18
    };





    switch (position) {
      case 0: {

        if(datesStudiedPastSeven.has(format(daysInWeek[0], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 22
          iconConfig.width = 22
        }
        break;

      }

      case 1: {

        if(datesStudiedPastSeven.has(format(daysInWeek[1], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 22
          iconConfig.width = 22
        }
        break;

    
      }

      case 2: {

        if(datesStudiedPastSeven.has(format(daysInWeek[2], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 22
          iconConfig.width = 22
        }
        break;

      }

      case 3: {

        if(datesStudiedPastSeven.has(format(daysInWeek[3], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 22
          iconConfig.width = 22
        }
        break;

      }

      case 4: {

        if(datesStudiedPastSeven.has(format(daysInWeek[4], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 22
          iconConfig.width = 22
        }
        break;

      }

      case 5: {

        if(datesStudiedPastSeven.has(format(daysInWeek[5], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 22
          iconConfig.width = 22
        }
        break;

      }

      case 6: {

        if(datesStudiedPastSeven.has(format(daysInWeek[6], 'yyyy-MM-dd'))){
          iconConfig.name = 'checkmark';
          iconConfig.fill = theme['color-primary-600']
          iconConfig.height = 22
          iconConfig.width = 22
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
    //If we are past 7 days since we started.

  return (


  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:800}}>
  <SafeAreaView style={{flex: 1}}>
  <Layout level='2' style={{flex:1, padding:16}}>




  {(differenceInDays(new Date(), startOfDay(userStartDate.toDate())) < 7) &&

  <Card disabled={true} style={{marginBottom:12, alignItems:'center' , borderWidth:0, borderRadius:12, elevation:1}}>
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
   style={{marginTop:12, marginBottom:16,letterSpacing:0.2, lineHeight:24,color:theme['color-basic-700'], textAlign:'center', marginHorizontal:32}}>
   It's your first week. Try to study at least once every day
   </Text>
   </View> 

   {/* //datesStudiedPastSeven.size  <Text category='c2' style={{alignSelf:'center', fontSize:11, color:theme['color-basic-600']}}> {daysSinceStartStudying >= 6 ? 'Last day' : 6-daysSinceStartStudying + "days left"}</Text> */}

    <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-around', marginBottom:24 }}>
    <View style={{alignItems:'center'}}>
    <Text style={{fontSize:60, fontWeight:'500',fontFamily:'Poppins-SemiBold'}}>{datesStudiedPastSeven.size}</Text>
    <Text style={{fontSize:13, color:theme['color-basic-700'], letterSpacing:0.2, fontFamily:'Poppins-Regular', marginTop:-16}}>Days Studied</Text>
    </View>
    </View>

    <View style={{marginHorizontal:40, marginBottom:32}}>
      
    <StepIndicator
         customStyles={customStyles}
         currentPosition={calculateCurrentPosition()}
         stepCount={7}
         renderStepIndicator={renderStepIndicator}
         labels={returnLabels()}
        
    />
    </View>
    </Card>

    }


  <Card style={{marginBottom:12, borderWidth:0, borderRadius:12, elevation:1, paddingVertical:12}}>
 

  <Text style={{alignSelf:'center'}} category='h6'>Time Studied</Text>
  
  <View style={{marginTop:12, marginBottom:4}}>
  <Text>{timeStudiedMessage()}</Text>
  </View>
  <View style={{borderBottomColor:theme['color-basic-400'], borderBottomWidth:0.9, marginTop:12}}></View> 

  <TimeComponent
  title={'This week'}
  minutesStudied={currentWeekMinutesStudied}
  barColor={theme['color-primary-400']}
  titleColor={theme['color-basic-800']}
  sessionCount={currentWeekCount}
  />


  <TimeComponent
  title={'Last week'}
  minutesStudied={oneWeekAgoMinutesStudied}
  barColor={theme['color-basic-400']}
  titleColor={theme['color-basic-600']}
  sessionCount={oneWeekAgoCount}
  />


  </Card>


 

  

  <Card disabled={true} style={{marginBottom:12, paddingTop:12, paddingBottom:24, borderWidth:0, borderRadius:12, elevation:1}}>
  {/* <View style={{ flexDirection:'row', alignItems:'center', marginBottom:4}}>
  <Icon fill={theme['color-primary-700']} height={20} width={20}  name='calendar'/>
  <Text category='h6' style={{marginLeft:8,color:theme['color-primary-800'], marginTop:4}}>Calendar</Text>
  </View>  */}
    
  <Calendar

  //markingType={'custom'}
  markedDates={returnMarkedDates()}
  current={convertDateToString(new Date())}
  minDate={convertDateToString(startOfMonth(userStartDate.toDate()))}
  maxDate={convertDateToString(endOfMonth(new Date()))}

  monthFormat={'MMMM yyyy'}
  renderArrow={(direction) => (direction == 'left' ? <View><Icon fill={theme['text-basic-color']} height={ 15} width={15}  name='arrow-ios-back-outline'/></View> 
  : <View><Icon fill={theme['text-basic-color']} height={15} width={15}  name='arrow-ios-forward-outline'/></View>)}
  hideExtraDays={false}
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={0}
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter.
  // Enable the option to swipe between months. Default = false
  futureScrollRange={1}
  enableSwipeMonths={true}


  theme={{
    //WeekDay Label - Sun/Mon/Tues
    textSectionTitleColor: theme['color-basic-900'],

    todayTextColor: theme['color-info-400'],
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
      marginTop:Platform.OS ==='ios' ? 7 : 7,
      color: theme['text-basic-color'],//'purple'//theme['text-basic-color']
      fontFamily:'OpenSans-SemiBold',
      fontWeight:'600'
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
