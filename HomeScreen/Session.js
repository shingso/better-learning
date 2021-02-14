import React, { useState, useEffect, useContext} from 'react';
import {  View, SafeAreaView, StyleSheet, ImageBackground, Vibration, Animated, Image } from 'react-native'
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
          setConfirmBackVisible(true)
    
        })
    
        return unsubscribe
          
      },
     
      [confirmBackVisible, studySessionPosition]
    );

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
          // snotif.cancelAll()
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
        notif.scheduleNotif(5)

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
    <Layout level='2' style={{flex:1}}>

    <StudyProgressIndicator currentStep={studySessionPosition}/>
    <SafeAreaView style={{flex: 1, padding:16}}>
    
    {studySessionPosition == 0 &&
    <View style={{flex:1}}>

    
    <BodyComponent
    pictureFile={require('../assets/images/timev2-01.png')}
    title={'Get ready to focus on studying'}
    bodyText={<Text>Start the study session and a <Text category='s1' style={{fontWeight:"bold"}}>{timerSettings.timeSettings} minute timer</Text> will start. During this time stay engaged in studying.</Text>}
    bodyTextColor={theme['color-basic-700']}
   />

  {/* <View style={{flex:1, justifyContent:'center'}}>
      <Image
            style={{
              width:420,
              height:180,
              alignSelf:'center',
              resizeMode:'contain',
              marginBottom:48
            }}
            source={require('../assets/images/timev2-01.png')}
          />
      
      <View>
      <Text style={{textAlign:'center'}}><Text category='h6' style={{fontWeight:'bold'}}>{'Get ready to focus on studying'}</Text></Text>
      <Text style={{marginTop:20,letterSpacing:0.2, lineHeight:30, fontSize:14,color:theme['color-basic-600'], textAlign:'center', marginHorizontal:12}}><Text>Start the study session and a <Text category='s1' style={{fontWeight:"bold"}}>{timerSettings.timeSettings} minute timer</Text> will start. During this time stay engaged in studying.</Text></Text>
      </View>
      </View> */}

    {/* <View style={{flex:1, justifyContent:'center'}}> 
    <Text category='h5' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12}}>Start the study session and a <Text category='h5' style={{fontWeight:"bold"}}>{timerSettings.timeSettings} minute timer</Text> will begin.</Text>
    <Text category='h5' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12, marginTop:32}}>While the timer is running, stay <Text category='h5' style={{fontWeight:'bold'}}>focused and engaged</Text> on studying.</Text>
    </View> */}

    
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
    pictureFile={require('../assets/images/studycompletev2.png')}
    title={'Thats it for studying!'}
    bodyText={'Focus study time is complete'}
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
    title={'Write down what you have just learned'}
    bodyText={'In the next screen, type out what you can recall about what you just learned'}
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
        console.log('ran')
        addNote( authContext.user.uid, subjectsContext.lastUsedSubject.id , values.text, values.textTheme)
        } else {
         console.log('ran3')
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
    placeholder={'Main topic'}
    onChangeText={formikProps.handleChange('textTheme')}
    />
          
    <Input
    placeholder={'Think about what you just learned and type it out. Everything you type out should be from memory, do not refer to any notes.'}
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
    title={'Study Session Complete!'}
    bodyText={'Its time for a break'}
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


    </SafeAreaView>
    </Layout>
      
      
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