import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity,  Animated,  Vibration, Alert, ImageBackground } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button, Icon, Layout, Modal, Card, Text } from '@ui-kitten/components';
import BackgroundTimer from 'react-native-background-timer';
import TopHeader from '../UtilComponents/TopHeader'



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


  
function BreakScreen({ route }){

const [visible, setVisible] = useState(false)
const [confirmBackVisible, setConfirmBackVisible] = useState(false)
const [isPlaying, setIsPlaying] = useState(null)
const [initialTimeSet, setInitialTimeSet] = useState(null)
const [timeElaspased, setTimeElaspased] = useState(0)
const [hasPlayed, sethasPlayed] = useState(false)
const [hasEnded, setHasEnded] = useState(false)
const [nav, setNav] = useState(null)
const navigation = useNavigation();



const { subjectID, mode } = route.params


useEffect(() => {

  if(!hasPlayed || hasEnded  || confirmBackVisible ){
    return;
  }

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      
      
      e.preventDefault();
      setNav(e)
      setConfirmBackVisible(true)
      /* 
      onPress: () => navigation.dispatch(e.data.action),
      */
      
    })
  
    return unsubscribe
  },
    
  [navigation, hasPlayed, hasEnded, confirmBackVisible]
);



const CustomBackHeader = () => {
  return(
  <View style={{alignSelf:'flex-start', marginLeft: -20}}>
  <Button size='small' appearance='ghost' accessoryLeft={BackIcon} onPress={()=>navigation.dispatch(StackActions.Top())}></Button>
  </View>
  )
}



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
  navigation.dispatch(StackActions.popToTop());
};



const backgroundTimerEnded = () => {
  
  setIsPlaying(false)
  setHasEnded(true)
  Vibration.vibrate()
  BackgroundTimer.stopBackgroundTimer()

  setTimeout(() => {
    setVisible(true)
  }, 1000);

 
}

const confirmBreakEnd = () => {
    setVisible(false)
    navigation.pop()
    navigation.navigate('TimerScreen', { subjectID: subjectID, mode: 'ADVANCED2' })
}
   


const endBreak = () => {
    
    setIsPlaying(false)
    BackgroundTimer.stopBackgroundTimer()
    setTimeout(() => {
      setVisible(true)
    }, 1000);
  
   
}

const startBreak = (time) => {
    setInitialTimeSet(time)
    setIsPlaying(true)    
    sethasPlayed(true)
}


return (

       
  <Layout style={{ flex: 1, padding:16 }}>
  <ImageBackground style={{flex:1}} resizeMode={'contain'} opacity={0.8}  source={require('../assets/images/poolbreak.png')}>
  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <CustomBackHeader/>
  </View>


  <View style={{ flex: 1 , alignItems:'center', marginVertical: 20, marginTop:30 ,justifyContent:'space-between' }}>
  
  <Text category='h1' style={{marginBottom:12}}>It's time for a break</Text>
  <Text>Breaks are important to reset our train of thought</Text>

  <View style={{flex:1,justifyContent:'center',}}> 
  
  {isPlaying &&
  <Animated.Text style={{ fontSize:70,fontFamily:'OpenSans-Bold'}}>
  {initialTimeSet-timeElaspased > 0 ? msToTime(initialTimeSet-timeElaspased) : '00:00'}
  </Animated.Text>
   }
  
  
  </View>



{!hasPlayed &&
  <View style={{flexDirection:'row', marginBottom:20}}>
  
  <Button onPress={()=>startBreak(5000)}>
    10:00
  </Button>


  <Button  style={{marginLeft:20}} onPress={()=>startBreak(900000)}>
    15:00
  </Button>
  </View>
}
  


  <Button onPress={()=>endBreak()}>
    BACK TO STUDYING
  </Button>

  <Modal
  visible={visible}
  backdropStyle={styles.backdrop}
  >
  <Card disabled={true}>
  <View style={{justifyContent:'center', alignItems:'center'}}>
  <Text style={{marginVertical:12}}>Break Ended!</Text>
  <Button onPress={confirmBreakEnd}>
  Back to Studying
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
  <Text style={{marginVertical:12, marginBottom:24 ,textAlign:'center'}}>Are you sure you want to end the current break?</Text> 
  <View style={{flexDirection:'row', marginBottom:8}}>
    
  <Button status='danger' style={{marginRight:12}} onPress={popToTop}>
  End Break
  </Button>

  <Button appearance='outline' onPress={()=>setConfirmBackVisible(false)}>
  Close
  </Button>
  </View>
  </View>
  </Card>
  </Modal>      
          
  </View>
  </ImageBackground>
  </Layout>
  
  )
};

export default BreakScreen

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