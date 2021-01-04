import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity,  Animated,  Vibration, Alert } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text, Layout, useTheme } from '@ui-kitten/components';
import BackgroundTimer from 'react-native-background-timer';
import { decrementActiveUsers, updateUserLastStudied } from '../helperFunctions';
import { AuthContext } from '../AuthContext'
import { UserDataContext } from '../UserDataContext'
import { differenceInDays} from 'date-fns'

const PauseIcon = (props) => (
  <Icon name='pause-circle' width={50} height={50} {...props} />
);

const PlayIcon = (props) => (
  <Icon name='play-circle' width={120} height={120} {...props} />
);

const PlayIconSmall = (props) => (
  <Icon name='play-circle' width={90} height={90} {...props} />
);





const BackIcon = (props) => (
  <Icon {...props} width={30} height={30} name='arrow-back' />
);





const msToTime = (duration) => {

    let seconds = Math.floor((duration / 1000) % 60)
    let minutes = Math.floor((duration / (1000 * 60)) % 60)
    //minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return  minutes + ":" + seconds
}


  

function TimerScreenFunc(){

const theme = useTheme()
const userData = useContext(UserDataContext)
const lastStudied = userData.lastStudied
const [visible, setVisible] = useState(false)
const [confirmBackVisible, setConfirmBackVisible] = useState(false)
const [isPlaying, setIsPlaying] = useState(null)
const [initialTimeSet, setInitialTimeSet] = useState(null)
const [timeElaspased, setTimeElaspased] = useState(0)

const [hasEnded, setHasEnded] = useState(false)
const [nav, setNav] = useState(null)
const navigation = useNavigation();


const authContext = useContext(AuthContext)


useEffect(() => {

    if( hasEnded || confirmBackVisible ){
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

    
  [navigation, hasEnded, confirmBackVisible]
);



const CustomBackHeader = () => {
  return(
  <View style={{alignSelf:'flex-start', marginLeft: -20}}>
  <Button size='small' appearance='ghost' accessoryLeft={BackIcon} onPress={()=>navigation.dispatch(StackActions.popToTop())}></Button>
  </View>
  )
}


useEffect(() => {
 
    setInitialTimeSet(4000)
    setIsPlaying(true)
}, [])

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


const popToTop = () => {
  decrementActiveUsers()
  navigation.dispatch(StackActions.popToTop());
};

  
const backgroundTimerEnded = () => {
  //check this
  let userLastStudied = new Date(lastStudied.toDate())
  let currentDate = new Date()
  let differenceInLastStudied = differenceInDays(currentDate, userLastStudied)


  setIsPlaying(false)
  setHasEnded(true)
  Vibration.vibrate()

  updateUserLastStudied(authContext.user.uid, differenceInLastStudied)
  BackgroundTimer.stopBackgroundTimer()

  setTimeout(() => {
    setVisible(true)
  }, 1000);

 
}

const confirmCompleted = () =>{
  setVisible(false)
  navigation.pop()
  decrementActiveUsers(authContext.user.id)
  navigation.navigate('RecallExplain')
}



return (

       
  <Layout level='2' style={{ flex: 1, padding:16 }}>
 
  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <CustomBackHeader/>
 
  </View>


  <View style={{ flex: 1 , alignItems:'center', marginVertical: 20, marginTop:30 ,justifyContent:'space-between' }}>
  
  


  


  {!hasEnded &&
  <View style={{flex:1,justifyContent:'center'}}> 
  <Animated.Text style={{ fontSize:70,fontFamily:'OpenSans-Bold', color:theme['text-basic-color']}}>
  { initialTimeSet-timeElaspased > 0 ? msToTime(initialTimeSet-timeElaspased) : '00:00'}
  </Animated.Text>
  </View>
  }



  {!hasEnded &&
  <View>
  {isPlaying ?
  <View>
  <Button size={'giant'} appearance={'ghost'} accessoryLeft={PauseIcon} onPress={()=>setIsPlaying(false)}/>
  </View>:

  <View> 
  <Button size={'giant'} appearance={'ghost'} accessoryLeft={PlayIconSmall} onPress={()=>setIsPlaying(true)}/>
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
  <Text style={{marginVertical:12}}>Completed!</Text>
  <Button onPress={confirmCompleted}>
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