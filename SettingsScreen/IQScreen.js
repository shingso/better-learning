import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { endOfDay, subDays , startOfDay,differenceInDays, differenceInCalendarDays, subWeeks, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval, addDays} from 'date-fns'
import { UserDataContext } from '../UserDataContext'
import { Layout, Card, List, Text, Button, Icon, useTheme } from '@ui-kitten/components';
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ScrollView } from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';

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

  const dateStats = studyStatsData.dates
  const userStartDate = userData.timeStamp
  const userStartStudyingDate = userData.startedStudying
  const allDateStats = studyStatsData.allDates
  const lastStudied = userData.lastStudied
  const daysSinceLastStudy = differenceInDays(new Date(), lastStudied.toDate())
  const daysSinceStartStudying = differenceInDays(new Date(), userStartStudyingDate.toDate())
  
  // if its greater than 14 days
  console.log(differenceInDays(new Date(), lastStudied.toDate()))

  

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

    //get the last seven days of study or all the days of study at this point
    //console.log(userStartWeek)
    console.log('Dates', daysSinceStartStudying)
  }



  const renderSettingBenchmark = () => (

    

    //need to get the next 7 days 
    //need to get last 7 days of study form today
    //need to match them up 
    <View>
    <Button onPress={()=>newFunction()}/>
    </View>
  )

  
  const customStyles = {
    
  stepIndicatorSize: 30,
    currentStepIndicatorSize:30,
    separatorStrokeWidth:2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: theme['color-primary-800'],
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: theme['color-primary-400'],
    stepStrokeUnFinishedColor: theme['color-basic-500'],
    separatorFinishedColor: theme['color-primary-400'],
    separatorUnFinishedColor: theme['color-basic-500'],
    stepIndicatorFinishedColor: theme['color-primary-400'],
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: theme['color-basic-800'],
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: theme['color-basic-500'],


  }


  return (

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:800}}>

    <SafeAreaView style={{flex: 1}}>
   
    <Layout level='2' style={{flex:1, padding:16}}>

    {(daysSinceLastStudy > 15 || daysSinceStartStudying < 7) &&
    <Card onPress={calculateStudyStrength} style={{marginBottom:12, paddingVertical:16}}>
    <ImageBackground opacity={0.0} resizeMode='cover'  source={require('../assets/images/walkingwithoutbackground.png')} style={styles.image}>
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
    <Text category={'h6'}>Setting Benchmark</Text>
    </View>
   {/*  {renderSettingBenchmark()} */}
    


   {/*  <View style={{flexDirection:'row', justifyContent:'space-around'}}>
    <View style={{alignItems:'center', marginVertical:20}}>
    <Text category='h1'>7</Text>
    <Text category='label'>Studied Last 7 days</Text> 
    </View>
    </View> */}


    <View style={{marginVertical:40}}>

    <Text category='label' style={{textAlign:'center', marginBottom:12}}>Days into setting benchmark</Text>
    <StepIndicator
         customStyles={customStyles}
         currentPosition={daysSinceStartStudying}
         stepCount={7}
    />
    </View>


    <Text category='p1' style={{textAlign:'center'}}>The next 6 days after you start studying will be a benchmark of how you are studying</Text>
    </ImageBackground>
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


    <Card onPress={calculateStudyStrength} style={{marginBottom:12, paddingBottom:16, paddingTop:16}}>
    <ImageBackground opacity={0.00} resizeMode='cover'  source={require('../assets/images/walkingwithoutbackground.png')} style={styles.image}>
    <View style={{ justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
    <Text style={{marginBottom:16}} category={'h6'}>Recommended Study</Text>

    <View style={{ justifyContent:"space-between"}}>

    
    <View style={{alignItems:'center'}}>
    <Text category='h1'>{5}</Text>
    <Text category='label'>times per week</Text>
    </View>

    </View>

    </View>
    
    <Text style={{lineHeight:20, textAlign:'center', marginTop:12}}>Space out your study sessions over a period of the week.</Text>
    </ImageBackground>

    </Card>

   
    {/* <Card onPress={calculateStudyStrength} style={{marginBottom:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
    <Text category={'h6'}>Recommended Study</Text>
    <Text>{5}</Text>
    </View>
    <Text>You've been studying extremely consistently for the last few weeks. Try and add a few more study sessions</Text>
    </Card> */}
    
    
    

    

   
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