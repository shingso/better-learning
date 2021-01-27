import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, StyleSheet, ImageBackground} from 'react-native'
import { Button, Icon,  Card, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import firestore from '@react-native-firebase/firestore';
import { incrementActiveUsers } from '../helperFunctions';
import StudyProgressIndicator from '../UtilComponents/StudyProgressIndicator'
import NotifService from '../UtilComponents/NotifService';


  const ClockIcon = (props) => (
    <Icon {...props} width={30} height={30} name='clock-outline' />
  );


function SetTimer({ route }){
    const notif = new NotifService();
    const [ activeUsers, setActiveUsers] = useState(0)
    const navigation = useNavigation();

    const customNav = () => {
      navigation.pop()
      notif.scheduleNotif()
      incrementActiveUsers()
      navigation.navigate("TimerScreen")
    }


       
    useEffect(() => {
      
      async function fetchData(){
        const ref = firestore().collection('CurrentUsers').doc('ActiveUsers')
        const response = await ref.get()

        setActiveUsers(response.data().NumberOfActiveUsers)
      }

      fetchData()
      
      
    }, []);

    return (
    <Layout level='2' style={{flex:1}}>

    <StudyProgressIndicator currentStep={0}/>
    <SafeAreaView style={{flex: 1, padding:16}}>
    
    <View style={{flex:1}}>
    <View style={{flex:1, justifyContent:'center'}}> 
    <Text category='h5' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12}}>Start the study session and a <Text category='h5' style={{fontWeight:"bold"}}>25 minute timer</Text> will begin.</Text>
    <Text category='h5' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12, marginTop:32}}>While the timer is running, stay <Text category='h5' style={{fontWeight:'bold'}}>focused and engaged</Text> on studying.</Text>

    </View>
    
    <View style={{ marginBottom:0, justifyContent:'flex-end', alignItems:'center'}}>
    
    <View style={{flexDirection:'row',  marginBottom:16, alignItems:'center'}}>
    <Text category='c1'>Active Studiers: </Text>
    <Text  category='c1' style={{ fontWeight:'bold' }}>{activeUsers}</Text>
    </View>

    <View style={{flexDirection:'row', marginBottom:30, paddingHorizontal:16}}>
{/*     <Button status={'basic'} appearance='outline' style={{marginRight:16, flex:1}}>Back</Button> */}
    <Button style={{flex:1, borderRadius:30}} size={'large'} onPress={customNav}>
      Start
    </Button>
    </View>


    </View>
   
   </View>
    </SafeAreaView>
    </Layout>
      
      
    );

      //we need to update state when we add an item
    
    }

export default SetTimer


const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
        marginBottom:20
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',

    },
    footerControl: {
      marginHorizontal: 2,
    },
  });