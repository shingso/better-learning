import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity,  Animated,  Vibration, Alert } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text, Layout } from '@ui-kitten/components';
import BackgroundTimer from 'react-native-background-timer';
import { UserDataContext } from '../UserDataContext'
import { updateUserStreakData } from '../helperFunctions'
import { AuthContext } from '../AuthContext'
import TopHeader from '../UtilComponents/TopHeader'

const PauseIcon = (props) => (
  <Icon name='pause-circle' width={90} height={90} {...props} />
);

const PlayIcon = (props) => (
  <Icon name='play-circle' width={120} height={120} {...props} />
);

const PlayIconSmall = (props) => (
  <Icon name='play-circle' width={90} height={90} {...props} />
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
const [confirmBackVisible, setConfirmBackVisible] = useState(false)
const [isPlaying, setIsPlaying] = useState(null)
const [initialTimeSet, setInitialTimeSet] = useState(null)
const [timeElaspased, setTimeElaspased] = useState(0)
const [hasPlayed, sethasPlayed] = useState(false)
const [hasEnded, setHasEnded] = useState(false)
const [nav, setNav] = useState(null)
const navigation = useNavigation();
const user = useContext(AuthContext)
const userData = useContext(UserDataContext)

const { subjectID } = route.params

useEffect(() => {

    if( !hasPlayed || hasEnded || confirmBackVisible ){
      return;
    }

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {

      setIsPlaying(false)
      e.preventDefault();
      setNav(e)
      setConfirmBackVisible(true)

    })

    return unsubscribe
    
   
  },

    
  [navigation, hasEnded, hasPlayed, confirmBackVisible]
);



const CustomBackHeader = () => {
  return(
  <View style={{alignSelf:'flex-start', marginLeft: -20}}>
  <Button size='small' appearance='ghost' accessoryLeft={BackIcon} onPress={()=>navigation.dispatch(StackActions.popToTop())}></Button>
  </View>
  )
}


useEffect(() => {
 
 
    setMode(route.params.mode);
    setInitialTimeSet(4000)
    setTimeElaspased(0)


}, [route.params.mode])

useEffect(() => {

  //check if mounted 
  if (isPlaying) {

    BackgroundTimer.runBackgroundTimer(() => { 
      setTimeElaspased(timeElaspased => timeElaspased + 1000)
      }, 
      1000);

  } else {
    BackgroundTimer.stopBackgroundTimer()
  }

  return function cleanup(){
    BackgroundTimer.stopBackgroundTimer()
  }

}, [isPlaying]);


useEffect(() => {

  if(timeElaspased == initialTimeSet){
    backgroundTimerEnded()
  }

}, [timeElaspased]);


const startBackgroundTimer = () =>{
  setIsPlaying(true)
  sethasPlayed(true)
}

const popToTop = () => {
  console.log('ran')
  navigation.dispatch(StackActions.popToTop());
};


const stopBackgroundTimer = () => {
  setIsPlaying(false)
}
  
const backgroundTimerEnded = () => {
  setIsPlaying(false)
  setHasEnded(true)
  Vibration.vibrate()
  let updatedIQ = userData.IQ + userData.currentStreak + 1
  let updatedStreak = userData.currentStreak + 1
  let highestStreak = userData.highestStreak

  if(updatedStreak > highestStreak){
    highestStreak = highestStreak + 1
  }

  BackgroundTimer.stopBackgroundTimer()

  updateUserStreakData(user.uid, updatedIQ , updatedStreak, highestStreak, subjectID)
  
  setTimeout(() => {
    setVisible(true)
  }, 1000);

 
}


const onRefresh = () =>{
   setTimeElaspased(0)
}

confirmAddNote = () =>{
  setVisible(false)
  navigation.pop()
  navigation.navigate('Recall', { subjectID: subjectID, mode: mode})
}



return (

       
  <Layout level='2' style={{ flex: 1, padding:16 }}>
 
  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <CustomBackHeader/>
  <Button appearance={'outline'} accessoryLeft={RefreshIcon} onPress={()=>onRefresh()}/>
  </View>


  <View style={{ flex: 1 , alignItems:'center', marginVertical: 20, marginTop:30 ,justifyContent:'space-between' }}>
  
  

  {/* {hasPlayed && */}
  <View style={{flexDirection:'row'}}>
  <Text>Currently:</Text>
  <Text style={{textAlign:'center'}} >{isPlaying ? ' Studying' : ' Paused'}</Text>
  </View>
  {/* } */}

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
  <Button onPress={confirmAddNote}>
  Let's wrap this up
  </Button>
  </View>
  </Card>
  </Modal>

  <Modal
  visible={confirmBackVisible}
  backdropStyle={styles.backdrop}
  >

  <Card style={{marginHorizontal:40}} disabled={true}>
  <View style={{justifyContent:'center', alignItems:'center'}}>
  <Text style={{marginVertical:12, marginBottom:24 ,textAlign:'center'}}>Are you sure you want to leave this current study session?</Text> 
  <View style={{flexDirection:'row', marginBottom:8}}>
    
  <Button status='danger' style={{marginRight:12}} onPress={popToTop}>
  End Study Session
  </Button>

  <Button appearance='outline' onPress={()=>setConfirmBackVisible(false)}>
  Close
  </Button>
  </View>
  </View>
  </Card>
  </Modal>      
          
  </View>
  </Layout>
  
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

  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});