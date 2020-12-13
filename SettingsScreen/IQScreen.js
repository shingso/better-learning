import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { format, endOfMonth, isThisMonth, isThisYear, subDays , differenceInDays, differenceInCalendarDays, subWeeks, startOfWeek, endOfWeek, isWithinInterval} from 'date-fns'
import { UserDataContext } from '../UserDataContext'
import { Layout, Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction , Tooltip, ListItem, DateService} from '@ui-kitten/components';
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ScrollView } from 'react-native-gesture-handler';

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);


const commitsData = [{"date": "2020-11-11"}, {"date": "2020-11-11"}, {"date": "2020-11-13"}, {"date": "2020-11-13"}, {"date": "2020-11-13"}, {"date": "2020-11-23"}, {"date": "2020-11-23"}, {"date": "2020-11-30"}, {"date": "2020-11-30"}, {"date": "2020-11-30"}, {"date": "2020-11-30"},{"date": "2020-12-06"}, {"date": "2020-12-01"}, {"date": "2020-12-01"}, {"date": "2020-12-01"}, {"date": "2020-12-01"}, {"date": "2020-12-02"}, {"date": "2020-12-02"}, {"date": "2020-12-02"}, {"date": "2020-12-02"}, {"date": "2020-12-02"}, {"date": "2020-12-02"}, {"date": "2020-12-02"}, {"date": "2020-12-03"}, {"date": "2020-12-03"}, {"date": "2020-12-03"}, {"date": "2020-12-03"}, {"date": "2020-12-03"}, {"date": "2020-12-03"}, {"date": "2020-12-03"}, {"date": "2020-12-03"}, {"date": "2020-12-04"}, {"date": "2020-12-04"}, {"date": "2020-12-04"}, {"date": "2020-12-05"}, {"date": "2020-12-05"}, {"date": "2020-12-05"}, {"date": "2020-12-06"},{"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"}, {"date": "2020-12-06"},  {"date": "2020-12-06"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-07"}, {"date": "2020-12-08"}, {"date": "2020-12-08"}]
;

function IQScreen(){

  const userData = useContext(UserDataContext)
  const studyStatsData = useContext(StudyStatsContext)
  const timesStudiedMonthStat = studyStatsData.timesStudiedMonth
  const timesStudiedStat = studyStatsData.timesStudied
  const timesStudiedTwoWeek = studyStatsData.timesStudiedTwoWeek
  const timesStudiedTwoWeeksUnique = studyStatsData.timesStudiedTwoWeeksUnique
  const dateStats = studyStatsData.dates
  const userStartDate = userData.timeStamp
  const allDateStats = studyStatsData.allDates

  const calculateStudyFrequency = () => {
    
    const currentDate = new Date()
    const weeklyFrequencyDict = {1:0,2:0,3:0,4:0}

   

    const startOfCurrentWeek = startOfWeek(currentDate)

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
    let count = 0

    dateStats.forEach(element => {

      let newDate = new Date(element.date)

   
      if(isWithinInterval(newDate, {start:startOfWeekOneWeek, end:endOfWeekOneWeek})){
        weeklyFrequencyDict[1] += 1
        count += 1
      } 

      if(isWithinInterval(newDate, {start:startOfWeekTwoWeek, end:endOfWeekTwoWeek})){
        weeklyFrequencyDict[2] += 1
        count += 1
      } 

      if(isWithinInterval(newDate, {start:startOfWeekThreeWeek, end:endOfWeekThreeWeek})){
        weeklyFrequencyDict[3] += 1
        count += 1
      }

      if(isWithinInterval(newDate, {start:startOfWeekFourWeek, end:endOfWeekFourWeek})){
        weeklyFrequencyDict[4] += 1
        count += 1
      }
    });

  
  
  //console.log(allDateStats)

  return count/4

  
  

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

  return (

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:800}}>
    <SafeAreaView style={{flex: 1}}>
  
    <Layout style={{flex:1, padding:16}}>
    <Card onPress={calculateStudyStrength} style={{marginVertical:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
    <Text category={'s1'}>Study Strength</Text>
    <Text>{calculateStudyStrength()}</Text>
    </View>
    <Text>Your study strength is determined by how consistently you have been studying</Text>
    </Card>


    <Card onPress={calculateStudyFrequency} style={{marginBottom:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
    <Text category={'s1'}>Weekly Average</Text>
    <Text>{calculateStudyFrequency()}</Text>
    </View>
    <Text>Your weekly average studied per week over the last four weeks</Text>
    </Card>

    <Card onPress={calculateStudyStrength} style={{marginBottom:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
    <Text category={'s1'}>Recommended Study</Text>
    <Text>{7}</Text>
    </View>
    <Text>You've been studying extremely consistently for the last few weeks. Try and add a few more study sessions</Text>
    </Card>

{/*     <Card>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>Total Studied</Text>
    <Text>{timesStudiedStat}</Text>
    </View>
    </Card> */}
    

    <Card style={{marginBottom:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>Times Studied this Month</Text>
    <Text>{timesStudiedMonthStat}</Text>
    </View>
    </Card>

    <Card style={{justifyContent:'center', paddingVertical:12, alignItems:'center', height:280}}>
 
    <Text category='s1' style={{marginBottom:16, textAlign:'center'}}>Study Frequency</Text>
  
    <CalendarHeatmap
    endDate={endOfMonth(new Date())}
    numDays={99}
    //need to pass in style prop to mon
    //Need to pass in our own color array 
    colorArray={["#eee", "#D44B79", "#6B1928", "#9F3251", "#360000",'#360000']}
    values={commitsData}
    monthLabelsStyle={{fontSize:14, fill:'black'}}
    monthLabelsColor={'black'}
    />
  
    </Card>

    </Layout>
    </SafeAreaView>
    </ScrollView>
      
      );

    
    }

export default IQScreen

const styles = StyleSheet.create({


});