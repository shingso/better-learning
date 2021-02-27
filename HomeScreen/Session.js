import React, { useState, useEffect, useContext} from 'react';
import {  View, SafeAreaView, StyleSheet, ImageBackground, Vibration, Animated, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Icon,  Card, Text, Layout, useTheme, Input, Modal } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { incrementActiveUsers } from '../helperFunctions';
import StudyProgressIndicator from '../UtilComponents/StudyProgressIndicator'
import NotifService from '../UtilComponents/NotifService';
import { AuthContext } from '../AuthContext'
import { Formik } from 'formik';
import { UserDataContext } from '../UserDataContext'
import { differenceInDays} from 'date-fns'
import { decrementActiveUsers, updateUserLastStudied, addNote, msToTime } from '../helperFunctions';
import BackgroundTimer from 'react-native-background-timer';
import * as Yup from 'yup';
import FolderSelectionComponent from '../UtilComponents/FolderSelectionComponent'
import { SubjectsContext } from '../SubjectsContext';
import { TimerSettingsContext } from '../TimerSettingsContext';



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
          marginBottom:48
        }}
        source={props.pictureFile}
      />
  
  <View>
  <Text style={{textAlign:'center'}}><Text category='h6' style={{fontWeight:'bold'}}>{props.title}</Text></Text>
  <Text style={{marginTop:20,letterSpacing:0.2, lineHeight:30, fontSize:14,color:props.bodyTextColor, textAlign:'center', marginHorizontal:12}}>{props.bodyText}</Text>
  </View>
  </View>
)

function Session(){
    
    const [ activeUsers, setActiveUsers] = useState(0)
    const theme = useTheme()
    const userData = useContext(UserDataContext)
    const lastStudied = userData.lastStudied
    const startedStudying = userData.startedStudying
    const [visible, setVisible] = useState(false)
    const [confirmBackVisible, setConfirmBackVisible] = useState(false)
    const [isPlaying, setIsPlaying] = useState(null)
    const [initialTimeSet, setInitialTimeSet] = useState(null)
    const [timeElaspased, setTimeElaspased] = useState(0)
    const [studySessionPosition, setStudySessionPosition] = useState(0)
    const [hasEnded, setHasEnded] = useState(false)
    const subjectsContext = useContext(SubjectsContext)
    const navigation = useNavigation();
    const authContext = useContext(AuthContext)
    const timerSettings = useContext(TimerSettingsContext)


  
      

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
        setIsPlaying(true)
        notif.scheduleNotif(initialTimeSet-timeElaspased)
        
      }
      setConfirmBackVisible(false)

    };

    const popToTop = () => {
        if(studySessionPosition == 1){
            decrementActiveUsers()
            notif.cancelAll()
        }
        navigation.dispatch(StackActions.popToTop());
      };

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
          // notif.cancelAll()
          BackgroundTimer.stopBackgroundTimer()
        }
      
    }, [isPlaying]);

    useEffect(() => {

        if(timeElaspased == initialTimeSet){
          backgroundTimerEnded()
        }
      
    }, [timeElaspased]);
      
      

    useEffect(() => {
      
      async function fetchData(){
        const ref = firestore().collection('CurrentUsers').doc('ActiveUsers')
        const response = await ref.get()
        setActiveUsers(response.data().NumberOfActiveUsers)
      }

      fetchData()
      //timerSettings.timeSettings * 60 * 1000
      setInitialTimeSet(10000)
      
    }, []);

    const backgroundTimerEnded = () => {
        //check this
        let userLastStudied = new Date(lastStudied.toDate())
        let currentDate = new Date()
        let differenceInLastStudied = differenceInDays(currentDate, userLastStudied)
        setIsPlaying(false)
        setHasEnded(true)
        //Vibration.vibrate()
        updateUserLastStudied(authContext.user.uid, differenceInLastStudied, startedStudying, timerSettings.timeSettings)
        BackgroundTimer.stopBackgroundTimer()
        setTimeout(() => {
          setVisible(true)
        }, 1000);
       
    }


    const startStudySession = () =>{
        notif.scheduleNotif(initialTimeSet)
        incrementActiveUsers()
        setStudySessionPosition(studySessionPosition + 1)
        setIsPlaying(true)
    }

    const toRecall = () =>{ 
        decrementActiveUsers()
        notif.cancelAll()
        setStudySessionPosition(studySessionPosition + 1) 
    }
      

    return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <Layout level='2' style={{flex:1}}>
    <SafeAreaView style={{flex: 1}}>
    <StudyProgressIndicator currentStep={studySessionPosition}/>
    <View style={{flex:1, padding:16}}>
    {studySessionPosition == 0 &&
    <View style={{flex:1}}>

  
    <BodyComponent
    pictureFile={require('../assets/images/timev2-01.png')}
    title={'A period of focused studying'}
    bodyText={<Text>Press start and a <Text category='s1' style={{fontWeight:"bold"}}>{timerSettings.timeSettings} minute timer</Text> will begin. During this time stay engaged in learning by being in continuous thought.</Text>}
    bodyTextColor={theme['color-basic-700']}
   />


    <View style={{ marginBottom:0, justifyContent:'flex-end', alignItems:'center'}}>
    <View style={{flexDirection:'row',  marginBottom:16, alignItems:'flex-end'}}>
    <Text category='c2' style={{color:theme['text-hint-color']}}>Active Studiers: </Text>
    <Text category='c1' style={{ fontWeight:'bold' }}>{activeUsers}</Text>
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
    <Animated.Text style={{fontSize:60, color:theme['text-basic-color']}}>
    { initialTimeSet-timeElaspased > 0 ? msToTime(initialTimeSet-timeElaspased) : ''}
    </Animated.Text>
    </View>

    }

    {(hasEnded && visible) &&
    
    <View style={{flex:1}}>
    <BodyComponent
    pictureFile={require('../assets/images/studyperiodover.png')}
    title={'The study period is over!'}
    bodyText={'We can furthur internalize what we have learned by thinking about what we have just learned.'}
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

    <BodyComponent pictureFile={require('../assets/images/recallexplain.png')} 
    title={'Think about what you have just learned'}
    bodyText={'In the next screen, type out from memory what you have just learned about.'}
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
    placeholder={'Think about what you just learned and type it out. Everything you type out should be from memory. Do not refer to any study materials.'}
    style={{backgroundColor:theme['background-basic-color-2'], borderColor:theme['background-basic-color-2'], marginTop:12}}
    textAlignVertical={'top'}

    textStyle={{fontSize:15, height:120, lineHeight:20}}
    multiline={true}
    autoFocus={true}
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
    />
    </View>
    
    <View style={styles.buttonContainer}>
    <Button size='large' style={styles.button} disabled={!(formikProps.dirty && formikProps.isValid)} onPress={()=>formikProps.handleSubmit()} >
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
    pictureFile={require('../assets/images/studyfinishedv1.png')}
    title={'Your done!'}
    bodyText={"Now that you've completed studying, its best to take a break. Breaks help refresh our mind which helps in knowledge retention and furthur continued focus."}
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
    <Text style={{marginVertical:12, marginBottom:16 ,textAlign:'center', lineHeight:24}}>Are you sure you want to end the current study session?</Text> 
   
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

      //we need to update state when we add an item
    
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
        marginHorizontal:16
    }

 });