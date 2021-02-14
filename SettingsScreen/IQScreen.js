import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ImageBackground, Image } from 'react-native'

import { endOfDay, subDays , startOfDay, differenceInCalendarWeeks, format, differenceInDays, differenceInCalendarDays, subWeeks, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval, addDays, getDay} from 'date-fns'
import { UserDataContext } from '../UserDataContext'
import { Layout, Card, List, Text, Button, Icon, useTheme, Divider } from '@ui-kitten/components';
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ScrollView } from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { formatMinutes } from '../helperFunctions';



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

  //useEffect(()=>{console.log('ran')}, [theme])
  
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

  
  //need to refactor this 
  //const daysSinceLastStudy = differenceInDays(new Date(), startOfDay(userStartStudyingDate.toDate()))

  const TimeComponent = (props) => {
    //borderBottomWidth:0.2, borderColor:theme['color-basic-300']
    return(
    
    <View style={{  flexDirection:'row',justifyContent:'space-between', paddingVertical:4, paddingTop:24, borderTopWidth:0.7, borderTopColor:theme['color-basic-300'], marginHorizontal:-24, paddingHorizontal:24}}>
    
    <View>
    <Text style={{ marginBottom:8}} category='s2'>{props.title}</Text>
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:20}}>
    <Text category='c2' style={{color:theme['text-hint-color'], marginRight:4}}>{props.weekLabel}</Text>
    <Icon name='calendar-outline' fill={theme['text-hint-color']} height={13} width={13}/>
    </View>
    </View>

    <View style={{alignItems:'flex-end'}}>
    
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:8}}>
    <Text style={{marginRight:8}} category='s1'>{props.sessionCount} <Text category='c2' style={{color:theme['text-hint-color']}}>sessions</Text></Text>
    <Icon name='checkmark-circle-2' fill={theme['color-primary-300']} height={14} width={14}/>
    </View>


    
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{marginRight:8}}>{formatMinutes(props.minutesStudied)}</Text>
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


  const [currentWeekMinutesStudied, setCurrentWeekMinutesStudied] = useState(0)
  const [oneWeekAgoMinutesStudied, setOneWeekAgoMinutesStudied] = useState(0)
  const [twoWeekAgoMinutesStudied , setTwoWeekAgoMinutesStudied ] = useState(0)

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

    for (const [key, value] of Object.entries(allDatesDict)) {

      switch(value) {
        case 1:
          newDict[key] = {
            customStyles: {
              container: {
                backgroundColor: theme['color-primary-300'],
                
              },
              text: {
                color:theme['color-basic-100'],
                fontWeight:'bold',
                
              }
            }
          }
          break;
        case 2:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-300'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
          break;

        case 3:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-500'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
          break;
        
        case 4:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-500'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
        break;

        case 5:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-700'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
        break;
       
        case 6:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-700'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
        break;

        case 7:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-800'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
        break;

      
        case 8:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-800'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
        break;

        case 9:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-900'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
        break;

        default:
            newDict[key] = {
              customStyles: {
                container: {
                  backgroundColor: theme['color-primary-900'],
                  
                },
                text: {
                  color:theme['color-basic-100'],
                  fontWeight:'bold',
                  
                }
              }
            }
        }     
    }
    
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




  {(calculateDaysSinceLastStudy() >= 28 || calculateDaysSinceStartedStudy() < 7) &&

  <Card  style={{marginBottom:16, alignItems:'center' , borderWidth:0.5}}>
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
   <Text category={'h6'}>Your First Week</Text>
   <Text 
   style={{marginTop:12, marginBottom:24,letterSpacing:0.2, lineHeight:24,color:theme['color-basic-600'], textAlign:'center', marginHorizontal:32}}>
    Try to study once per day.
     </Text>
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



<Card onPress={()=>returnMarkedDates()} style={{marginBottom:16, borderWidth:0.5, paddingBottom:0}}>
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
  <TimeComponent title={'Current Week'} minutesStudied={currentWeekMinutesStudied} sessionCount={currentWeekCount} weekLabel={getCurrentWeekLabel()}/>
  </View>
  
  {calculateDaysSinceStartedStudy() > 7 &&
  <View>
  <TimeComponent title={'Last Week'} minutesStudied={oneWeekAgoMinutesStudied} sessionCount={oneWeekAgoCount}  weekLabel={getLastWeekLabel()}/>
  </View>
  }
  {calculateDaysSinceStartedStudy() > 14 &&
  <TimeComponent title={'Two Weeks Ago'} minutesStudied={twoWeekAgoMinutesStudied} sessionCount={twoWeekAgoCount} weekLabel={getTwoWeeksAgoLabel()}/>
  } 
  </Card>




  

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
    calendarBackground: null,
    calendarHeaderStyle:{
      color:'green'
    },
    textMonthFontSize: 18,
    textDayHeaderFontSize: 13,
    textDayHeaderFontFamily:'OpenSans-Bold',
    textDayFontFamily:'OpenSans-Regular',
    textDisabledColor:theme['color-basic-600'],
    textDayStyle:{
      marginTop:6,
      color: theme['text-basic-color']//'purple'//theme['text-basic-color']
      
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
