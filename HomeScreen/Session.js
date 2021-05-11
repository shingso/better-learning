import React, { useState, useEffect, useContext} from 'react';
import {  View, SafeAreaView, StyleSheet, Platform, Animated, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Button, Icon,  CheckBox, Text, Layout, useTheme, Input, Modal } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { incrementActiveUsers, storeSession } from '../helperFunctions';
import StudyProgressIndicator from '../UtilComponents/StudyProgressIndicator'
import StudyProgressIndicatorSkip from '../UtilComponents/StudyProgressIndicatorSkip'
import NotifService from '../UtilComponents/NotifService';
import { AuthContext } from '../AuthContext'
import { Formik, setIn } from 'formik';
import { differenceInMilliseconds, addMilliseconds, set } from 'date-fns'
import { decrementActiveUsers, addCompletedSession, addNote, msToTime } from '../helperFunctions';
import BackgroundTimer from 'react-native-background-timer';
import * as Yup from 'yup';
import FolderSelectionComponent from '../UtilComponents/FolderSelectionComponent'
import { SubjectsContext } from '../SubjectsContext';
import { TimerSettingsContext } from '../TimerSettingsContext';
import GlobalStyle from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextSchema = Yup.object().shape({
    text: Yup.string()
      .min(1, 'Its crucial to recall inorder to learn')
      .max(300, 'Too Long!')
      .required('Type out what you have learned below '),
  
  });
  

let notif = new NotifService();


const BodyComponent = (props) => (
  <View style={{flex:1, justifyContent:'center'}}>
  <Image
        style={{
          width:420,
          height:180,
          alignSelf:'center',
          resizeMode:'contain',
          marginBottom:60
        }}
        source={props.pictureFile}
      />
  
  <View>
  <Text style={{textAlign:'center'}}><Text category='h6'>{props.title}</Text></Text>
  <Text style={{marginTop:20,letterSpacing:0.1, lineHeight:30, fontSize:14,color:props.bodyTextColor, textAlign:'center', marginHorizontal:12, fontFamily:'Poppins-Regular'}}>{props.bodyText}</Text>
  </View>
  </View>
)

function Session(){
    
    const [ activeUsers, setActiveUsers] = useState(0)
    const theme = useTheme()
    const [visible, setVisible] = useState(false)
    const [confirmBackVisible, setConfirmBackVisible] = useState(false)
    const [initialTimeDateSet, setInitialTimeDateSet] = useState(null)
    const [timeDifference, setTimeDifference] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [studySessionPosition, setStudySessionPosition] = useState(0)
    const [hasEnded, setHasEnded] = useState(false)
    const subjectsContext = useContext(SubjectsContext)
    const navigation = useNavigation();
    const authContext = useContext(AuthContext)
    const timerSettings = useContext(TimerSettingsContext)
    const [checked, setChecked] = React.useState(false);
    const [initialChecked, setInitialChecked] = React.useState(false);
  
    const skipRecallExplain = (value) => {
      try {
          AsyncStorage.setItem('@skipscreen3', JSON.stringify(value));
          setInitialChecked(value)
      } catch (error) {
          console.log(error)
          }
      };



    useEffect(() => {

        if( confirmBackVisible || studySessionPosition == 4 || studySessionPosition == 0 ){
          return;
        }
    
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    
          setIsPlaying(false)
          e.preventDefault();
          notif.cancelAll()
          setConfirmBackVisible(true)
    
        })
    
        return unsubscribe
          
      },
     
      [confirmBackVisible, studySessionPosition]
    );


    const closeBackModal = () => {
      if(studySessionPosition == 1){
        setInitialTimeDateSet(addMilliseconds(new Date(), timeDifference))
        notif.scheduleNotif(timeDifference)
        setIsPlaying(true)
      }
      setConfirmBackVisible(false)

    };

    const popToTop = () => {
        if(studySessionPosition == 1 && !hasEnded){
            decrementActiveUsers()
            storeSession(false, null)
            notif.cancelAll()
        }
        navigation.dispatch(StackActions.popToTop());
      };

    useEffect(() => {

        //check if mounted 
        if (isPlaying) {
      
          BackgroundTimer.runBackgroundTimer(() => { 
            //console.log(new Date())
            setTimeDifference(differenceInMilliseconds(initialTimeDateSet, new Date()))
           
            }, 
            200);
      
        } else {
          BackgroundTimer.stopBackgroundTimer()
        }
      
    }, [isPlaying]);

    useEffect(() => {

        if(timeDifference <= 0){
          backgroundTimerEnded()
        }
       
    }, [timeDifference]);
      
      

    useEffect(() => {
      
      async function fetchData(){
        const ref = firestore().collection('CurrentUsers').doc('ActiveUsers')
        const response = await ref.get()
        setActiveUsers(response.data().NumberOfActiveUsers)
      }

      async function getSkipScreen(){
        try {
            const value = await AsyncStorage.getItem('@skipscreen3')
            if(value !== null) {
              setChecked(JSON.parse(value))
    
            } else {
                AsyncStorage.setItem('@skipscreen3', JSON.stringify(false))
                setChecked(false)
              
            }
          } catch(e) {
            console.log(e)
          }
    }


    async function getCurrentSession(){
      const emptySession = [false, null]
      try {
          const value = await AsyncStorage.getItem('@sessionStatus')
          if(value !== null) {
            let parsedValue = JSON.parse(value)
   
            if(parsedValue[0] == true && parsedValue[1] != null){
             
              setInitialTimeDateSet(new Date(parsedValue[1]))
              setStudySessionPosition(1)
              setIsPlaying(true)
            
            }

          } else {
              AsyncStorage.setItem('@sessionsStatus', JSON.stringify(emptySession))
            
          }
        } catch(e) {
          console.log(e)
        }
  }

      fetchData()
      getSkipScreen()
      getCurrentSession()

    
   

    }, []);

    const backgroundTimerEnded = () => {
        decrementActiveUsers()
        setIsPlaying(false)
        setHasEnded(true)
        //Vibration.vibrate()
        storeSession(false, null)
        addCompletedSession(authContext.user.uid, timerSettings.timeSettings)
        BackgroundTimer.stopBackgroundTimer()
        setTimeout(() => {
          setVisible(true)
        }, 1000);
       
    }


    const startStudySession = () =>{
        let milliSecondTimeEnd = addMilliseconds(new Date(), timerSettings.timeSettings * 60 * 1000 + 1000) 
        incrementActiveUsers()  
        notif.scheduleNotif(timerSettings.timeSettings * 60 * 1000 + 1000)
        setInitialTimeDateSet(milliSecondTimeEnd)
        storeSession(true, milliSecondTimeEnd)
        setStudySessionPosition(studySessionPosition + 1)
        setIsPlaying(true)
    }

    const toRecall = () =>{ 
        
        notif.cancelAll()
        if(checked == true){
          setStudySessionPosition(studySessionPosition + 2)
        } else {
          setStudySessionPosition(studySessionPosition + 1) 
        }
    }
      

    return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <Layout level='2' style={{flex:1}}>
    <SafeAreaView style={{flex: 1}}>
    {checked ? 
    <StudyProgressIndicatorSkip currentStep={studySessionPosition}/>:
    <StudyProgressIndicator currentStep={studySessionPosition}/>
    }
    <View style={{flex:1, padding:16}}>
    {studySessionPosition == 0 &&
    <View style={{flex:1}}>
    <BodyComponent
    pictureFile={require('../assets/images/startstudyv1-01.png')}
    title={'A period of focused study'}
    bodyText={<Text style={{fontFamily:'Poppins-Regular'}}>Press start and a <Text style={{fontFamily:"Poppins-Bold", fontSize:16, fontWeight:'800'}}>
    {timerSettings.timeSettings} minute timer</Text> will begin. Stay focused on studying while the timer is running.</Text>}
    bodyTextColor={theme['color-basic-700']}
    />


    <View style={{ marginBottom:0, justifyContent:'flex-end', alignItems:'center'}}>
    <View style={{flexDirection:'row',  marginBottom:16, alignItems:'flex-end'}}>
    <Text style={{color:theme['text-hint-color'], fontSize:13}}>People currently studying: </Text>
    <Text style={{ fontFamily:'Poppins-SemiBold', marginBottom: Platform.OS == 'ios' ? 0 : -5, fontSize:13, fontWeight:'600'}}> {activeUsers}</Text>
    </View>

    <View style={{flexDirection:'row', marginBottom:30, paddingHorizontal:16}}>
    <Button style={styles.button} size={'large'} onPress={startStudySession}>
     Start
    </Button>
    </View>
    </View>
    </View>
    }

    {studySessionPosition == 1 &&
    <View style={{flex:1 }}>
    {!hasEnded &&

    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <View style={{flex:1, justifyContent:'center'}}>
    <Animated.Text style={{fontSize:70, color:theme['text-basic-color'], fontFamily:'Poppins-SemiBold', }}>
    {timeDifference > 1 ? msToTime(timeDifference) : ''}
    </Animated.Text>
    </View>
    <Text style={{lineHeight:28, marginBottom:60,textAlign:'center',marginHorizontal:20,letterSpacing:0.2, color:theme['color-basic-700'], fontFamily:'Poppins-Regular'}}>Stay focused on studying. Be mindful of when your attention wanders.</Text>
    </View>

    }

    {(hasEnded && visible) &&
    
    <View style={{flex:1}}>
    <BodyComponent
    pictureFile={require('../assets/images/studyoverv2-01.png')}
    title={'The study period is over'}
    bodyText={"To wrap up, lets think about what we've just learned."}
    bodyTextColor={theme['color-basic-700']}
    />
    <View style={styles.buttonContainer}>
    <Button style={styles.button} size='large' onPress={()=>toRecall()}>On to recall</Button>
    </View>
    </View>
    }
    </View>
    }


    {studySessionPosition == 2 &&
    <View style={{flex:1, justifyContent:'center'}}>
    <CheckBox
    style={{marginLeft:6,  marginTop:8}}
    status='basic'
    checked={initialChecked}
    onChange={nextChecked => skipRecallExplain(nextChecked)}>
    <Text style={{fontSize:12, fontFamily:'Poppins-SemiBold', fontWeight:'600' }}>Don't show this screen again</Text>
    </CheckBox>
    <BodyComponent pictureFile={require('../assets/images/recallexplainv2-01.png')} 
    title={"Lets think about what we've learned"}
    bodyText={"Take a minute and think about what you've just learned. In the next screen, type it out."}
    bodyTextColor={theme['color-basic-700']}
    />

    <View style={styles.buttonContainer}>
    <Button size='large' style={styles.button} onPress={()=>setStudySessionPosition(studySessionPosition+1)}>I'm ready to write</Button>
    </View>
    </View>
    
    }

    {studySessionPosition == 3 && 
    <View style={{flex:1}}>
    <Formik
    initialValues={{ text:'', textTheme:'', subject:''}}
    validationSchema={TextSchema}
    onSubmit={(values, actions) => {
        if(subjectsContext.lastUsedSubject != null){
        addNote( authContext.user.uid, subjectsContext.lastUsedSubject.id , values.text, values.textTheme)
        } else {
        addNote( authContext.user.uid, '', values.text, values.textTheme)
        }
        setStudySessionPosition(studySessionPosition+1)
       }}
    >
       
    {formikProps => (
    <React.Fragment> 

    <View style={{flex:1, marginHorizontal:8}}>
    <View style={{marginBottom:20, marginLeft:18}}>
    <FolderSelectionComponent/>
    </View>
        
    <Input
    textStyle={{fontSize:16, fontWeight:'bold'}}
    style={{marginBottom:4, marginTop:4, borderColor:theme['background-basic-color-2'], backgroundColor:theme["background-basic-color-2"]}}
    placeholder={'Tag'}
    onChangeText={formikProps.handleChange('textTheme')}
    />
          
    <Input
    placeholder={`Think about what you've just learned and type it out. Everything should be from memory. Do not refer to any materials.`}
    style={{backgroundColor:theme['background-basic-color-2'], borderColor:theme['background-basic-color-2'], marginTop:12}}
    textAlignVertical={'top'}
    textStyle={{fontSize:15, height:120, lineHeight:20}}
    multiline={true}
    autoFocus={true}
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
    />


    <Button size='large' style={{marginTop:12,  borderRadius:30, marginHorizontal:16, ...GlobalStyle.ButtonShadow}} disabled={!(formikProps.dirty && formikProps.isValid)} onPress={()=>formikProps.handleSubmit()} >
    Done
    </Button>
    </View>
    

   

    </React.Fragment>
    )}
    </Formik>
   
    </View>
    }


    {studySessionPosition == 4 && 
    <View style={{flex:1, justifyContent:'center'}}>

    <BodyComponent
    pictureFile={require('../assets/images/sessionover.png')}
    title={'Thats it!'}
    bodyText={"You've just finished a study session. It's best to take a break."}
    bodyTextColor={theme['color-basic-700']}
    />

    <View style={styles.buttonContainer}>
    <Button style={styles.button} size='large' onPress={()=>{navigation.dispatch(StackActions.popToTop())}}>Complete</Button>
    </View>
    </View>

    }



    <Modal
    visible={confirmBackVisible}
    backdropStyle={styles.backdrop}
    >

    <Layout style={{flex:1, paddingTop:20, paddingHorizontal:20, borderRadius:12, marginHorizontal:60}}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text category='s1' style={{marginVertical:12, marginBottom:16 ,textAlign:'center', lineHeight:24}}>Are you sure you want to end the current study session?</Text> 
   
    <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50, marginHorizontal:-20, borderBottomRightRadius:12, borderBottomLeftRadius:12, width:300, justifyContent:'center', marginTop:16}}>
    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
    <TouchableOpacity onPress={()=>closeBackModal()} style={{flex:1, height:50, borderRightWidth:0.5, borderRightColor:theme['color-basic-400'], justifyContent:'center' }}>
    <Text category='s1' style={{ textAlign:"center", color:theme['color-info-500'] }}>Close</Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={()=>popToTop()} style={{flex:1, height:50, justifyContent:'center'}}>
    <Text category='s1' style={{ textAlign:"center",  color:theme['color-danger-600']}}>End Session</Text>
    </TouchableOpacity>
    </View>
    </View>


    </View>
    </Layout>
    </Modal>    

    </View>
    </SafeAreaView>
    </Layout>
    </TouchableWithoutFeedback>
      
      
    );

    }

export default Session


const styles = StyleSheet.create({

    backdrop:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    buttonContainer:{
        paddingBottom:30,
        flexDirection:'row'
    },
    
    button:{
        flex:1,
        borderRadius:30,
        marginHorizontal:16,
        ...GlobalStyle.ButtonShadow

    }

 });