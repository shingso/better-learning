import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity,  Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import ProgressBar from '../UtilComponents/ProgressBar';
import BackgroundTimer from 'react-native-background-timer';
import { UserDataContext } from '../UserDataContext'
import { updateUserStreakData } from '../helperFunctions'
import { AuthContext } from '../AuthContext'
import TopHeader from '../UtilComponents/TopHeader'

const PauseIcon = (props) => (
  <Icon name='pause-circle-outline' width={80} height={80} {...props} />
);

const PlayIcon = (props) => (
  <Icon name='play-circle-outline' width={80} height={80} {...props} />
);

const RefreshIcon = (props) => (
  <Icon {...props} width={30} height={30} name='refresh-outline' />
);


const BackIcon = (props) => (
  <Icon {...props} width={30} height={30} name='arrow-back' />
);


const msToTime = (duration) =>{

    let seconds = Math.floor((duration / 1000) % 60)
    let minutes = Math.floor((duration / (1000 * 60)) % 60)
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return  minutes + ":" + seconds
}



function TimerScreenFunc({ route }){

const [mode, setMode] = useState(route.params.mode)
const [visible, setVisible] = useState(false)
const [isPlaying, setIsPlaying] = useState(null)
const [initialTimeSet, setInitialTimeSet] = useState(null)
const [timeElaspased, setTimeElaspased] = useState(0)

const user = useContext(AuthContext)
const userData = useContext(UserDataContext)

const { subjectID } = route.params

useEffect(() => {
 
  if (route.params.mode == 'BASIC') {
    setMode(route.params.mode);
    setInitialTimeSet(1500000)
    setTimeElaspased(0)
  }

  if (route.params.mode == 'ADVANCED') {
    setMode(route.params.mode);
    setInitialTimeSet(4000)
    setTimeElaspased(0)
  }

  if (route.params.mode == 'BREAK') {
    setMode(route.params.mode);
    setInitialTimeSet(1000)
    setTimeElaspased(0)
  }


}, [route.params.mode])

useEffect(() => {



  if (isPlaying) {

    BackgroundTimer.runBackgroundTimer(() => { 

      setTimeElaspased(timeElaspased => timeElaspased + 1000)
      console.log(visible, 'ran')
       
      }, 
      1000);
    

  } else {

    BackgroundTimer.stopBackgroundTimer()
    
  }



}, [isPlaying]);


const navigation = useNavigation();

const navigateBack = () => {
    navigation.goBack();
};
  
const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={()=>navigateBack()}/>
  );
  


const startBackgroundTimer = () =>{

  setIsPlaying(true)

// BackgroundTimer.runBackgroundTimer(() => { 
 
//   setIsPlaying(true)
//   setTimeElaspased(timeElaspased+1000)
  
   
//   }, 
//   1000);

  
}


const stopBackgroundTimer = () => {
    
  setIsPlaying(false)


}
  


const backgroundTimerEnded = () => {
  setIsPlaying(false)
  let updatedIQ = userData.IQ + userData.currentStreak + 1
  let updatedStreak = userData.currentStreak + 1
  let highestStreak = userData.highestStreak

  if(updatedStreak > highestStreak){
    highestStreak = highestStreak + 1
  }
  BackgroundTimer.stopBackgroundTimer()
  updateUserStreakData(user.uid, updatedIQ , updatedStreak, highestStreak)
  
  setTimeout(() => {
    setVisible(true)
    }, 1000);
  
  //setVisible(true)
 


}



const onRefresh = () =>{
   setTimeElaspased(0)


}

confirmAddNote = () =>{

  setVisible(false)
  navigation.navigate('AddNotes', {id: subjectID, mode: mode})
}


return (

       
  <View style={{ flex: 1, padding:16}}>
  
  <TopHeader/>

  <View style={{ flex: 1 , alignItems:'center', marginVertical: 20, marginTop:30 ,justifyContent:'space-between' }}>
  
  <ProgressBar 
      backgroundColor={'blue'}
      height={16} 
      width={400-32} 
      underlyingColor={'gray'}
      borderWidth={0} 
      borderRadius={4} 
      value={(timeElaspased/initialTimeSet)* 100} 
      maxValue={100}
      onComplete={()=>backgroundTimerEnded()}
    
      /> 


    
  <View>
  <Animated.Text style={{ fontSize:50, color: 'blue'}}>
  { initialTimeSet-timeElaspased > 0 ? msToTime(initialTimeSet-timeElaspased) : '00:00'}
  </Animated.Text>
  </View>

  <View style={{flexDirection:'row'}}>
   <Button size={'giant'} appearance={'ghost'} accessoryLeft={PauseIcon} onPress={()=>stopBackgroundTimer()}/>
   <Button size={'giant'} appearance={'ghost'} accessoryLeft={PlayIcon} onPress={()=>startBackgroundTimer()}/>
   <Button size={'giant'} appearance={'ghost'} accessoryLeft={RefreshIcon} onPress={()=>onRefresh()}/>
  </View>

    <Modal

    visible={visible}
    backdropStyle={styles.backdrop}
    >
      
    <Card disabled={true}>
    <Text>Completed!</Text>
    <Button size='small' onPress={()=>confirmAddNote()}>
    ADD NOTE
    </Button>
     
    </Card>
    </Modal>      
             
    </View>
    </View>
  
       
          )
};

export default TimerScreenFunc

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:12
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 8,
  },
});