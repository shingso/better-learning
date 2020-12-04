import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { format, endOfMonth, isThisMonth, isThisYear, subDays , isWithinRange } from 'date-fns'

import { UserDataContext } from '../UserDataContext'
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction , Tooltip, ListItem} from '@ui-kitten/components';

import { AuthContext } from '../AuthContext'

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

  const user = useContext(AuthContext)
  const userID = user.uid
  const [visible, setVisible] = React.useState(false);
  const [dates, setDates] = React.useState([]);
  const [timesStudied, setTimesStudied] = React.useState(0);
  const [timesStudiedMonth, setTimesStudiedMonth] = React.useState(0);
  const userData = useContext(UserDataContext)
      
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID).collection('DatesStudied')
 
    return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
      
      if(!querySnapshot.metadata.hasPendingWrites){
      
      const list = [];
      const datesDict = {}
      var count = 0

      querySnapshot.forEach(doc => {

          const timeStamp = doc.get('timeStamp', { serverTimestamps: 'estimate' })
          const newDate = new Date(timeStamp.toDate())
          const currentDate = format(newDate, 'yyyy-MM-dd')
        
          if(isThisMonth(newDate) && isThisYear(newDate)){
            count +=1
          }

          if(currentDate in datesDict){
            datesDict[currentDate] += 1
          } else {
            datesDict[currentDate] = 1
          }
      

      });

     

      for (var date in datesDict) {
        let item = {};
        item.date = date; 
        list.push(item)
     }
      setTimesStudied(querySnapshot.size)
      setTimesStudiedMonth(count)
      setDates(list);



    }
  });
  
  }, []);


  const calculateStudyStrength = (date) => {
    // Get current date
     let timesStudiedTwoWeeks = 0
     let currentDate = new Date()
     let twoWeeksAgo = subDays(currentDate, 14)

    /* if(isWithinRange( date , twoWeeksAgo, currentDate )){
      timesStudiedTwoWeeks += 1
      //increament a counter
    } */

  
    // if you studied for 12 times in the last 12 weeks you have a study strengt of 10

    // 7 = 5
    // 8 = 6
    // 9 = 7
    // 10 = 8
    // 11 = 9
    // 12-14 = 10

    // Multiple times PER

    // we can get currentNumberOfDays 

    // let timeLastedStudied = new Date(userData.lastedStudied.toDate())
    // if the currentDate is greater than two weeks of the time last studied
    // else go back 14 days and compute the amount of times studied
    // twoWeeksAgoDate = currentDate - 14 days
    // return a number between 1 and 10

    // Number of times studied in current Month/total number of days in the month
    // total number of times studied in the last 14 days

    // * by a certain amount if studied multiple times per day

    // return a max of 10 or our number
  
    return 1
  };

  const renderToggleButton = () => (
    <Button appearance='ghost' accessoryRight={InfoIcon} onPress={() => setVisible(true)}>
    </Button>
  );
  // the glitch is that the color is messed up 

  return (

    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={{flex: 1, padding:16}}>
    

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

    <Text category='s1' style={{marginVertical:8, marginBottom:16}}>Learning is a journey</Text>
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
    <Text>{timesStudied}</Text>
    </View>
    </Card>

    <Card style={{marginVertical:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>Study Strength</Text>
    <Text>{calculateStudyStrength()}</Text>
    </View>
    </Card>

    

    <Card style={{marginVertical:12}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Text category={'s1'}>Times Studied this Month</Text>
    <Text>{timesStudiedMonth}</Text>
    </View>
    </Card>

    
    <Card style={{justifyContent:'center', paddingVertical:12, alignItems:'center'}}>
    <Text style={{marginBottom:12}}>Study Frequency</Text>
    
    
    <CalendarHeatmap
    endDate={endOfMonth(new Date())}
    numDays={99}
    values={dates}
    monthLabelsStyle={{fontSize:14, fill:'black'}}
    //we need to fork so we can add a headerstyle
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