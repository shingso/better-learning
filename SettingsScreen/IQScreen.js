import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { format, endOfMonth } from 'date-fns'

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




// or we can keep a centrilized doc which would reduce reads, but increased writes...which seems fine

function IQScreen(){



  const user = useContext(AuthContext)

  const userID = user.uid
  const [visible, setVisible] = React.useState(false);
  const [dates, setDates] = React.useState([]);
  const [timesStudied, setTimesStudied] = React.useState(0);
  const userData = useContext(UserDataContext)
      
  useEffect(() => {

    const ref = firestore().collection('Users').doc(userID).collection('DatesStudied')
 
    return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
      const list = [];
      const datesDict = {}
      querySnapshot.forEach(doc => {
        const { timeStamp } = doc.data();
        const currentDate = format(new Date(timeStamp.toDate()), 'yyyy-MM-dd')
        // take the timestamp and convert it into and array
        if(currentDate in datesDict){
          datesDict[currentDate] += 1
        } else {
          datesDict[currentDate] = 1
        }
      });

     

      for (var date in datesDict) {
        let item = {};
        item.date = date;
        //item.count = datesDict[date];
        
        list.push(item)
     }
      setTimesStudied(querySnapshot.size)
      // take the dict and convert it into objects
      console.log(list)
      setDates(list);



    });
  }, []);


  const calculateStudyStrength = () => {
    // Get current date
    //let currentDate = new Date()
    //let timeLastedStudied = new Date(userData.lastedStudied.toDate())
    // if the currentDate is greater than two weeks of the time last studied
    // else go back 14 days and compute the amount of times studied
    // twoWeeksAgoDate = currentDate - 14 days
    
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
      
    <View style={{ justifyContent:'space-between'}}>
    </View>
 
    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
   
    </View>
{/*     <Tooltip
     
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
    <Text>{userData.totalTimesStudied}</Text>
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