import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity,  Animated,  Vibration } from 'react-native';

import { useNavigation, StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import BackgroundTimer from 'react-native-background-timer';
import { UserDataContext } from '../UserDataContext'
import { updateUserStreakData } from '../helperFunctions'
import { AuthContext } from '../AuthContext'
import TopHeader from '../UtilComponents/TopHeader'

const PauseIcon = (props) => (
  <Icon name='pause-circle-outline' width={90} height={90} {...props} />
);

const PlayIcon = (props) => (
  <Icon name='play-circle-outline' width={120} height={120} {...props} />
);

const PlayIconSmall = (props) => (
  <Icon name='play-circle-outline' width={90} height={90} {...props} />
);



const RefreshIcon = (props) => (
  <Icon {...props} width={30} height={30} name='refresh-outline' />
);


const BackIcon = (props) => (
  <Icon {...props} width={30} height={30} name='arrow-back' />
);


const msToTime = (duration) => {

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
const [hasPlayed, sethasPlayed] = useState(false)

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
       
      }, 
      1000);
    

  } else {

    BackgroundTimer.stopBackgroundTimer()
    
  }



}, [isPlaying]);


useEffect(() => {

  if(timeElaspased == initialTimeSet){
    backgroundTimerEnded()
  }

}, [timeElaspased]);


const navigation = useNavigation();

const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={()=>navigation.dispatch(StackActions.popToTop())}/>
  );
  


const startBackgroundTimer = () =>{
 
  setIsPlaying(true)
  sethasPlayed(true)

}


const stopBackgroundTimer = () => {
    
  setIsPlaying(false)

}
  


const backgroundTimerEnded = () => {
  setIsPlaying(false)
  Vibration.vibrate()
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

 


}


const onRefresh = () =>{
   setTimeElaspased(0)
}

confirmAddNote = () =>{

  setVisible(false)
  navigation.navigate('AddNotes', {id: subjectID, mode: mode})
}


return (

       
  <View style={{ flex: 1, padding:16 }}>
 
  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <TopHeader/>
  <Button appearance={'outline'} accessoryLeft={RefreshIcon} onPress={()=>onRefresh()}/>
  </View>


  <View style={{ flex: 1 , alignItems:'center', marginVertical: 20, marginTop:30 ,justifyContent:'space-between' }}>
  
  {hasPlayed &&
  <View style={{alignItems:'center'}}>
  <Text category='s1'>Currently:</Text>
  <Text style={{textAlign:'center'}} category='h2'>{isPlaying ? 'FOCUSED ON STUDYING' : 'PAUSED'}</Text>
  </View>
  }

  <View style={{flex:1,justifyContent:'center',}}> 
  
  {hasPlayed  &&
  <Animated.Text style={{ fontSize:70,fontFamily:'OpenSans-Bold'}}>
  { initialTimeSet-timeElaspased > 0 ? msToTime(initialTimeSet-timeElaspased) : '00:00'}
  </Animated.Text>
  }
  
  {!hasPlayed && 
  <Button size={'giant'} appearance={'ghost'} accessoryLeft={PlayIcon} onPress={()=>startBackgroundTimer()}/>
  }
  </View>


  {hasPlayed &&
  
  <View>
  {isPlaying ?
  <View>
  <Button size={'giant'} appearance={'ghost'} accessoryLeft={PauseIcon} onPress={()=>stopBackgroundTimer()}/>
  </View>:

  <View> 
  <Button size={'giant'} appearance={'ghost'} accessoryLeft={PlayIconSmall} onPress={()=>startBackgroundTimer()}/>
  </View> 
  }
  </View>
  
  }
    <Modal

    visible={visible}
    backdropStyle={styles.backdrop}
    >
      
    <Card disabled={true}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text>+{userData.currentStreak + 1} IQ</Text>
    <Text style={{marginVertical:12}}>Completed!</Text>
    <Button onPress={()=>confirmAddNote()}>
    Let's wrap this up
    </Button>
    </View>
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