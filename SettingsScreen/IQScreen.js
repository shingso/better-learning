import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { format, endOfMonth, isThisMonth, isThisYear, subDays , differenceInDays, differenceInCalendarDays} from 'date-fns'
import { UserDataContext } from '../UserDataContext'
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction , Tooltip, ListItem} from '@ui-kitten/components';
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ScrollView } from 'react-native-gesture-handler';

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);


const commitsData = [
  { date: '2010-11-01', count: 0 },
  { date: '2020-11-11', count: 1 },
  { date: '2020-11-02', count: 2 },
  { date: '2020-11-05', count: 1 },
  { date: '2020-11-13', count: 2 }

];

function IQScreen(){


  const [visible, setVisible] = React.useState(false);
  
  const userData = useContext(UserDataContext)
  const studyStatsData = useContext(StudyStatsContext)
  const timesStudiedMonthStat = studyStatsData.timesStudiedMonth
  const timesStudiedStat = studyStatsData.timesStudied
  const timesStudiedTwoWeek = studyStatsData.timesStudiedTwoWeek
  const timesStudiedTwoWeeksUnique = studyStatsData.timesStudiedTwoWeeksUnique
  const dateStats = studyStatsData.dates
  const userStartDate = userData.timeStamp

      
  const calculateStudyStrength = () => {
    // Get current date
     let studyStrength = 0
     let currentDate = new Date()
     let userStartDateConverted = new Date(userStartDate.toDate())
     let diffInStartToCurrent = differenceInCalendarDays(userStartDateConverted, currentDate)
     let extraMultiplier =  timesStudiedTwoWeek - diffInStartToCurrent
     console.log(timesStudiedTwoWeeksUnique , diffInStartToCurrent, extraMultiplier)
 /*     if( diffInStartToCurrent >= 14 ){
      //if difference in days is greater than 14 days
      //divide the unque times studied this month
      console.log(timesStudiedTwoWeeksUnique, diffInStartToCurrent,'Log')
     } else { 


      //divide the uniqu
      console.log(diffInStartToCurrent)


     }
 */

    // we want the user to have a higher score the beginning  

    // 7 = 5 - 50%
    // 8 = 6 - 57%
    // 9 = 7 - 64%
    // 10 = 8 - 71%
    // 11 = 9 - 78%
    // 12-14 = 10  - 85%

    // Number of times studied in current Month/total number of days in the month
   
    // * by a certain amount if studied multiple times per day

  
 
  };

  const renderToggleButton = () => (
    <Button appearance='ghost' accessoryRight={InfoIcon} onPress={() => setVisible(true)}>
    </Button>
  );
  // the glitch is that the color is messed up 

  return (

    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={{flex: 1, padding:16,}}>
    

    {/*<Tooltip
      anchor={renderToggleButton}
      visible={visible}
      accessoryLeft={InfoIcon}
      placement={'bottom end'}
      onBackdropPress={() => setVisible(false)}>
      What is IQ?
      IQ is just for fun!
      Everytime you finish a study session your IQ will go up by your current streak.
    </Tooltip> */}

    <Card onPress={calculateStudyStrength} style={{marginVertical:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text style={{marginBottom:8}} category={'s1'}>Study Strength</Text>
    <Text>{calculateStudyStrength()}</Text>
    </View>
    <Text>Your study strength is determined by how consistently you have been studying</Text>
    </Card>

    <Card>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>IQ</Text>
    <Text>{userData.IQ}</Text>
    </View>
    </Card>
      
    <Card style={{marginVertical:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>Started</Text>
    <Text>{format(new Date(userData.timeStamp.toDate()), 'MMMM dd yyyy')}</Text>
    </View>
    </Card>

    <Card>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>Total Studied</Text>
    <Text>{timesStudiedStat}</Text>
    </View>
    </Card>

    

        
    

    <Card style={{marginVertical:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>Times Studied this Month</Text>
    <Text>{timesStudiedMonthStat}</Text>
    </View>
    </Card>

    <Card style={{justifyContent:'center', paddingVertical:12, alignItems:'center', height:280}}>
    <Text style={{marginBottom:12}}>Study Frequency</Text>
  
    <CalendarHeatmap
    endDate={endOfMonth(new Date())}
    numDays={99}
    values={dateStats}
    monthLabelsStyle={{fontSize:14, fill:'black'}}
    />
    
    </Card>

    
   
    </SafeAreaView>
    </ScrollView>
      
      );

    
    }

export default IQScreen

const styles = StyleSheet.create({
  contentContainer: {
  
  },
  container: {
 
  },
  
  item: {
    marginVertical:4
  },

});