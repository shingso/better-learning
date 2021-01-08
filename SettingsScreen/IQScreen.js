import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { endOfDay, subDays , startOfDay, differenceInCalendarWeeks, format, differenceInDays, differenceInCalendarDays, subWeeks, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval, addDays} from 'date-fns'
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
  const daysSinceLastStudy = differenceInDays(new Date(), lastStudied.toDate())
  const daysSinceStartStudying = differenceInDays(new Date(), userStartStudyingDate.toDate())

  


  // if its greater than 14 days

  const convertDateToString = (date) => {
    return format(date,'yyyy-MM-dd')
  }




  const calculateStudyFrequency = () => {
    
    const _Date = new Date()
    const currentDate = startOfDay(new Date())
    const weeklyFrequencyDict = { 0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0 }


    const weeklyFrequencyArr = []

    const startOfCurrentWeek = startOfWeek(currentDate)
    const endOfCurrentWeek = endOfWeek(currentDate)

    const sevenDaysAgo = subDays(currentDate, 7)
    const eightDaysAgo = subDays(currentDate, 8)
    const endOfDayEight = endOfDay(eightDaysAgo)
    //console.log('log', sevenDaysAgo, eightDaysAgo, endOfDayEight)
    const fourteenDaysAgo = subDays(currentDate, 14)




    const oneWeekAgo = subWeeks(currentDate, 1)
    const startOfWeekOneWeek = startOfWeek(oneWeekAgo)
    const endOfWeekOneWeek = endOfWeek(oneWeekAgo)

    const twoWeeksAgo = subWeeks(currentDate, 2)
    const startOfWeekTwoWeek = startOfWeek(twoWeeksAgo)
    const endOfWeekTwoWeek = endOfWeek(twoWeeksAgo)

    const threeWeeksAgo = subWeeks(currentDate, 3)
    const startOfWeekThreeWeek = startOfWeek(threeWeeksAgo)
    const endOfWeekThreeWeek = endOfWeek(threeWeeksAgo)

    const fourWeeksAgo = subWeeks(currentDate, 4)
    const startOfWeekFourWeek = startOfWeek(fourWeeksAgo)
    const endOfWeekFourWeek = endOfWeek(fourWeeksAgo)

    const fiveWeeksAgo = subWeeks(currentDate, 5)
    const startOfWeekFiveWeek = startOfWeek(fiveWeeksAgo)
    const endOfWeekFiveWeek = endOfWeek(fiveWeeksAgo)

    const sixWeeksAgo = subWeeks(currentDate, 6)
    const startOfWeekSixWeek = startOfWeek(sixWeeksAgo)
    const endOfWeekSixWeek = endOfWeek(sixWeeksAgo)

    const sevenWeeksAgo = subWeeks(currentDate, 7)
    const startOfWeekSevenWeek = startOfWeek(sevenWeeksAgo)
    const endOfWeekSevenWeek = endOfWeek(sevenWeeksAgo)

    const eightWeeksAgo = subWeeks(currentDate, 8)
    const startOfWeekEightWeek = startOfWeek(eightWeeksAgo)
    const endOfWeekEightWeek = endOfWeek(eightWeeksAgo)
    
    
    let count = 0
    let monthlyAverage = 0
    let lastSevenDaysCount = 0
    let lastFourteenDaysCount = 0

    allDateStats.forEach(element => {

      let newDate = new Date(element.date)


      if(isWithinInterval(newDate, {start:sevenDaysAgo, end: _Date})){
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
       
      } else if(isWithinInterval(newDate, {start:startOfWeekFiveWeek, end:endOfWeekFiveWeek})){
        weeklyFrequencyDict[5] += 1
        count += 1
        
      } else if(isWithinInterval(newDate, {start:startOfWeekSixWeek, end:endOfWeekSixWeek})){
        weeklyFrequencyDict[6] += 1
        count += 1
      
      } else if(isWithinInterval(newDate, {start:startOfWeekSevenWeek, end:endOfWeekSevenWeek})){
        weeklyFrequencyDict[7] += 1
        count += 1
      
      } else if(isWithinInterval(newDate, {start:startOfWeekEightWeek, end:endOfWeekEightWeek})){
        weeklyFrequencyDict[8] += 1
        count += 1
      
      }


    });


    for (const [key, value] of Object.entries(weeklyFrequencyDict)) {
        weeklyFrequencyArr.push(value)
    }

    //console.log(findVariance(weeklyFrequencyArr))
    // if last seven day count is greater or equal to 
    // so this is the number that dictates the percentage chan ge

    // 1 would mean no change
    // .8 would mean that it went down 20%
    // 2 would mean an increase of 100%
    // any improvment should be a boost, but there is no 
    // this score will never impact your score if it is negative

    // What would be another important number

    // what is the mean of the last seven days over the mean of the last monmth
    let percentageChangeLastSeven = lastSevenDaysCount/lastFourteenDaysCount
    let sevenDayAverage = lastSevenDaysCount/7

    // we can also look at percentage change two weeks

    // should we compare it to the last 21 days?
      
  //consistency

  // only using uniques
  // so this would cap out at 7
  // we should take an average of this so its easier



  
  
  //console.log(weeklyFrequencyDict)

  return count/8
  

  }
      
  const calculateStudyStrength = () => {
    // Get current date
     let studyStrength = 0
     let currentDate = new Date()
     let userStartDateConverted = new Date(userStartDate.toDate())
     let diffInStartToCurrent = differenceInCalendarDays(userStartDateConverted, currentDate)
     let extraMultiplier =  timesStudiedTwoWeek - diffInStartToCurrent
     let currentScore = 0
     //console.log(timesStudiedTwoWeeksUnique , diffInStartToCurrent, extraMultiplier)
 /*     if( diffInStartToCurrent >= 14 ){
      //if difference in days is greater than 14 days
      //divide the unque times studied this month
      console.log(timesStudiedTwoWeeksUnique, diffInStartToCurrent,'Log')
     } else { 
     

      //divide the uniqu
      console.log(diffInStartToCurrent)


     }


 */
    if(currentScore > 0.85){
      studyStrength = 10
    } else if(currentScore > 0.77){
      studyStrength = 9
    } else if(currentScore > 0.70){
      studyStrength = 8
    } else if(currentScore > 0.63){
      studyStrength = 7
    } else if(currentScore > 0.54){
      studyStrength = 6
    } else if(currentScore > .47){
      studyStrength = 5
    } else if(currentScore > .40){
      studyStrength = 4
    } else if(currentScore > .01){
      studyStrength = 3
    } else {
      studyStrength = 0
      //You havent studied enough in the last two weeks to determine a score
    }

    // what if the user hasnt studied in a while an is coming back?
   

    // we want the user to have a higher score the beginning  

    // 7 = 5 - 50%
    // 8 = 6 - 57%
    // 9 = 7 - 64%
    // 10 = 8 - 71%
    // 11 = 9 - 78%
    // 12-14 = 10  - 85%

    // Number of times studied in current Month/total number of days in the month
   
    // * by a certain amount if studied multiple times per day

    return 8
 
  };

  
  // the glitch is that the color is messed up 

  // times studied in current week/month
  // monthly average per week
  // weekly consistency vs past two weeks - last 7 days vs last 14 days
  // last 7 days vs last 21 days

  const newFunction = () => {
    let _userStartDate = new Date(userStartDate.toDate())
    let _userStartDateBegin = startOfDay(_userStartDate)

    let userStartedStudying = new Date(userStartStudyingDate.toDate())


    //with this number we can find the how far from the benchmark date
    let currentDate = new Date()

    let differenceInStartDays = differenceInDays(currentDate, userStartedStudying)
    let sevenDaysAfterStart = addDays(_userStartDate, 6)
    let userStartWeek = eachDayOfInterval({start:_userStartDate, end:sevenDaysAfterStart})


    let diffInWeeks = differenceInCalendarWeeks(currentDate, userStartedStudying)

    const newDict = {}

/*     const startDate = startOfDay(userStartStudyingDate.toDate())
    const endDate = addDays(startDate, 6)
    const daysInWeek = eachDayOfInterval({start:startDate, end:endDate})
    const stringConvertedDates = []

    daysInWeek.forEach(item => stringConvertedDates.push(format(item,'yyyy-MM-dd')))
    
    uniqueDates.forEach(item => newDict[item] = {selected:true}) */
    console.log(diffInWeeks)
    //get the last seven days of study or all the days of study at this point
    //console.log(userStartWeek)
   
  }

  const returnMarkedDates = () => {
    const newDict = {}
    uniqueDates.forEach(item => newDict[item] = {
      customStyles: {
        container: {
          backgroundColor: theme['color-primary-200'],
          borderRadius:4,
      

        },
        text: {
          justifyContent:'center',
          alignItems:'center',
         
          color:theme['color-primary-700'],
          fontWeight:'bold',
          
        
        }
      }
    })
    return newDict
  }



  const returnLabels = (number) => {
    const addedDates = 0 + number
    const startDate = startOfDay(userStartStudyingDate.toDate())
    const startDateAdded = addDays(startDate, addedDates)
    const endDate = addDays(startDate, 6 + addedDates)
    const daysInWeek = eachDayOfInterval({start:startDateAdded, end:endDate})
    const stringConvertedDates = []

    daysInWeek.forEach(item => stringConvertedDates.push(format(item,'M-dd')))
    return stringConvertedDates
  }



  const renderSettingBenchmark = () => (

    

    //need to get the next 7 days 
    //need to get last 7 days of study form today
    //need to match them up 
    <View style={{marginTop:20}}>
    <Button onPress={()=>newFunction()}/>
    </View>
  )

  
  const customStylesCurrent = {
    
    stepIndicatorSize: 35,
    currentStepIndicatorSize:35,
    separatorStrokeWidth:35,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: theme['color-primary-700'],
    stepStrokeWidth: 1.5,
    stepStrokeFinishedColor: theme['color-primary-200'],
    stepStrokeUnFinishedColor: theme['color-basic-500'],
    separatorFinishedColor: theme['color-primary-200'],
    separatorUnFinishedColor: theme['color-basic-500'],
    stepIndicatorFinishedColor: theme['color-primary-200'],
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: theme['color-primary-200'],
    stepIndicatorLabelCurrentColor: 'red',
    stepIndicatorLabelFinishedColor: 'green',
    stepIndicatorLabelUnFinishedColor: 'black',
    labelColor: theme['color-basic-600'],
    labelSize: 9,
    currentStepLabelColor: theme['color-primary-700']

  }

  const customStyles = {
    
    stepIndicatorSize: 35,
    currentStepIndicatorSize:35,
    separatorStrokeWidth:35,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: theme['color-primary-200'],
    stepStrokeWidth: 1.5,
    stepStrokeFinishedColor: theme['color-primary-200'],
    stepStrokeUnFinishedColor: theme['color-basic-500'],
    separatorFinishedColor: theme['color-primary-200'],
    separatorUnFinishedColor: theme['color-basic-500'],
    stepIndicatorFinishedColor: theme['color-primary-200'],
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: theme['color-primary-200'],
    stepIndicatorLabelCurrentColor: 'red',
    stepIndicatorLabelFinishedColor: 'green',
    stepIndicatorLabelUnFinishedColor: 'black',
    labelColor: theme['color-basic-600'],
    labelSize: 9,
    currentStepLabelColor: theme['color-primary-700']

  }



  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {

    const startDate = startOfDay(userStartStudyingDate.toDate())
    const endDate = addDays(startDate, 6)
 
    const daysInWeek = eachDayOfInterval({start:startDate, end:endDate})

    const iconConfig = {
      name: 'close-outline',
      fill:  null,
      width:20,
      height:20
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

  return (

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:800}}>
    <SafeAreaView style={{flex: 1}}>
    {renderSettingBenchmark()}
    <Layout level='2' style={{flex:1, padding:16}}>

    {(daysSinceLastStudy > 15 || daysSinceStartStudying < 7) &&
    <Card onPress={calculateStudyStrength} style={{marginBottom:12, paddingVertical:32}}>
  
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
   {/*  {renderSettingBenchmark()} */}
    <Text style={{marginBottom:36}} category={'h6'}>Your Benchmark</Text>
    </View>

   
    <Text category='c2' style={{alignSelf:'center', fontSize:11, color:theme['color-basic-600']}}> {daysSinceStartStudying == 6 ? 'Last day' : 6-daysSinceStartStudying + "days left"}</Text>
    <StepIndicator
         customStyles={customStylesCurrent}
         currentPosition={daysSinceStartStudying}
         stepCount={7}
         renderStepIndicator={renderStepIndicator}
         labels={returnLabels(0)}
        
    />
   
    <View style={{flexDirection:'row', justifyContent:'center', marginTop:28}}>
    <View style={{alignItems:'center'}}>
     
    <Text category='h1'>{datesStudiedPastSeven.size}</Text>
    <Text style={{fontSize:13}}>days studied</Text>
    <Text style={{marginTop:36, fontSize:16,fontWeight:'bold'}} category='s1'>{sevenDaysCount} </Text> 
    <Text>total sessions</Text>
    {/* <Text style={{marginTop:24, textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text> */}
    </View>
    </View>
  

    </Card>

    }

    {daysSinceLastStudy > 7 &&
    <Card onPress={calculateStudyStrength} style={{marginBottom:12, paddingBottom:16, paddingTop:16}}>
    <ImageBackground opacity={0.15} resizeMode='cover'  source={require('../assets/images/walkingwithoutbackground.png')} style={styles.image}>
    <View style={{ justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
    <Text style={{marginBottom:16}} category={'h6'}>Study Strength</Text>
    <Text category='h1'>{calculateStudyStrength()}</Text>
    </View>
    <Text category='p1' style={{lineHeight:20, textAlign:'center'}}>Your study strength is determined by how consistently you have been studying</Text>
    </ImageBackground>
    </Card>
    }

    {daysSinceLastStudy > 7 &&
    <Card onPress={calculateStudyFrequency} style={{marginBottom:12, paddingVertical:20}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
    <Text category={'h1'}>Weekly Average</Text>
    <Text>{calculateStudyFrequency()}</Text>
    </View>
    <Text>Your weekly average studied per week over the last four weeks</Text> 
    </Card>
    }


  

    <Card disabled={true} style={{marginBottom:12, paddingTop:12, paddingBottom:24}}>
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
  
    dotColor: theme['color-primary-500'],
    selectedDotColor:'red',
    textMonthFontWeight: 'bold',
    textDayFontSize: 13,
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


    

   
    {/* <Card onPress={calculateStudyStrength} style={{marginBottom:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
    <Text category={'h6'}>Recommended Study</Text>
    <Text>{5}</Text>
    </View>
    <Text>You've been studying extremely consistently for the last few weeks. Try and add a few more study sessions</Text>
    </Card> */}
    
    
    <Card onPress={calculateStudyStrength} style={{marginBottom:12, paddingVertical:32}}>
    <View style={{flexDirection:'row', marginHorizontal:12, alignItems:'flex-end', marginBottom:2}}>
    <Text style={{fontSize:10, flex:1}}>2 weeks ago</Text>
    <View style={{flexDirection:'row', flex:1}}>
    <Text style={{fontSize:10, flex:1}} category='c1'><Text style={{fontWeight:'bold', fontSize:12}}>4</Text> days studied</Text>
    <Text style={{fontSize:10, flex:1}} category='c1'><Text style={{fontWeight:'bold', fontSize:12}}>4</Text> total sessions</Text>
    </View>
    </View>
    <StepIndicator
         customStyles={customStyles}
         currentPosition={daysSinceStartStudying}
         stepCount={7}
         renderStepIndicator={renderStepIndicator}
         labels={returnLabels(0)}
        
    />

    <View style={{marginTop:40}}>
    <View style={{flexDirection:'row', marginHorizontal:12, alignItems:'flex-end', marginBottom:2}}>
    <Text style={{fontSize:10, flex:1}}>1 week ago</Text>
    <View style={{flexDirection:'row', flex:1}}>
    <Text style={{fontSize:10, flex:1}} category='c1'><Text style={{fontWeight:'bold', fontSize:12}}>2</Text> days studied</Text>
    <Text style={{fontSize:10, flex:1}} category='c1'><Text style={{fontWeight:'bold', fontSize:12}}>4</Text> total sessions</Text>
    </View>
    </View>
    <StepIndicator
         customStyles={customStyles}
         currentPosition={daysSinceStartStudying}
         stepCount={7}
         renderStepIndicator={renderStepIndicator}
         labels={returnLabels(7)}
        
    />
    </View>
    <View style={{marginTop:40}}>
    <View style={{flexDirection:'row', marginHorizontal:12, alignItems:'flex-end', marginBottom:2}}>
    <Text style={{fontSize:10, flex:1}}>Current Week</Text>
    <View style={{flexDirection:'row', flex:1}}>
    <Text style={{fontSize:10, flex:1}} category='c1'><Text style={{fontWeight:'bold', fontSize:12}}>2</Text> days studied</Text>
    <Text style={{fontSize:10, flex:1}} category='c1'><Text style={{fontWeight:'bold', fontSize:12}}>5</Text> total sessions</Text>
    </View>
    </View>

    <StepIndicator
         customStyles={customStylesCurrent}
         currentPosition={daysSinceStartStudying}
         stepCount={7}
         renderStepIndicator={renderStepIndicator}
         labels={returnLabels(14)}
        
    />
    </View>
    </Card>


    <Card onPress={calculateStudyStrength} style={{marginBottom:12, paddingVertical:40,}}>
    <ImageBackground opacity={0.00} resizeMode='cover'  source={require('../assets/images/walkingwithoutbackground.png')} style={styles.image}>
    <View style={{ justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
    <Text style={{marginBottom:16}} category={'h6'}>Recommended Study</Text>
    <View style={{alignItems:'center'}}>
    <Text category='h1'>{5}</Text>
    <Text category='label'>times per week</Text>
    </View>
    </View>
    <Text style={{lineHeight:20, textAlign:'center', marginTop:12}}>Space out your study sessions over a period of the week.</Text>
    </ImageBackground>
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