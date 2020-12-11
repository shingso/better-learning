import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text, ButtonGroup } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import { StudyStatsContextWrapper } from '../StudyStats'
import { StudyStatsContext } from '../StudyStats'
import { getDay, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns'

const getText = (number) => {


    const messageDict = {

        0: 'You have studied 2 times in the past week',
        1: 'You have studied 2 times in the past week',
        2: 'hello',
        3: 'hello',
        4: 'hello',
        5: 'hello',
        6: 'hello',
        7: 'hello',

    }

    return messageDict[number]
}

const getPicture = (number) => {


    const pictureDict = {

        0: require('../assets/images/8600.5.png'),
        1: require('../assets/images/8600.5.png'),
        2: require('../assets/images/8600.5.png'),
        3: require('../assets/images/8600.5.png'),
        4: require('../assets/images/8600.5.png'),
        5: require('../assets/images/8600.5.png'),
        6: require('../assets/images/8600.5.png'),
        7: require('../assets/images/8600.5.png'),

    }

    return pictureDict[number]
}

const returnDayOfTheWeekCompleted = () => {

  let currentDate = new Date()
  let currentDayOfWeek = getDay(currentDate)
  let currentStartOfWeek = startOfWeek(currentDate)
  let currentEndOfWeek = endOfWeek(currentDate)
  let daysOfTheWeekStudied = {}
  let eachDayOfWeek = eachDayOfInterval({start:currentStartOfWeek, end:currentEndOfWeek})

  for(let x in eachDayOfWeek){
    
    console.log(format(eachDayOfWeek[x], 'yyyy-MM-dd'))

    //can we use overlapping days
    //after we have overll

  }




}


function ProgressHeader(props){
 
    const studyStatsData = useContext(StudyStatsContext)
    const timesStudiedWeek = studyStatsData.timesStudiedWeek

    // 0 times within the last two weeks - Motivation message to start
    // 1 times within the last two weeks - 
    // 4 times within the last two weeks - 
    // 7 times in the week? - Your killing it!  
    // depends on how many days have passed in the week 
    // need to set background pictures and text
    // return how many times you studied in the past week vs how many days have passed in the week

    return (
      <View>
      

      <View style={{flexDirection:'row'}}>
      <View></View>
      </View>

      <Card style={{marginTop:12}} onPress={()=>returnDayOfTheWeekCompleted()}>
      <ImageBackground opacity={0.20} resizeMode='cover' source={getPicture(props.messageNumber)} style={styles.image}>
      <Text>You have studied {timesStudiedWeek} times this week.</Text>
      </ImageBackground>
      </Card>
      </View>
      );

    }


  const ProgressHeaderWithStats = (props) => {
    return(
    <StudyStatsContextWrapper>
    <ProgressHeader {...props}/>
    </StudyStatsContextWrapper>
    )
  }

const styles = StyleSheet.create({
  
  item: {

    marginVertical:8,
   
  },
  //contanier that holds everything 
  
  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
  
    margin:-24,
    padding:24
  },
});

export default ProgressHeaderWithStats

