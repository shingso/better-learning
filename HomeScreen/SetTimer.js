import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, StyleSheet, ImageBackground} from 'react-native'
import { Button, Icon,  Card, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import firestore from '@react-native-firebase/firestore';
import { incrementActiveUsers } from '../helperFunctions';
import StudyProgressIndicator from '../UtilComponents/StudyProgressIndicator'



  const ClockIcon = (props) => (
    <Icon {...props} width={30} height={30} name='clock-outline' />
  );


function SetTimer({ route }){
 
    const [ activeUsers, setActiveUsers] = useState(0)
    const navigation = useNavigation();

    const customNav = () => {
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
    
    <View style={{flexDirection:'row', justifyContent:'center'}}>
    {/* <TopHeader/> */}
    
    </View>
    
    <View style={{ flex:1}}>
  
    <View style={{flex:1, justifyContent:'center'}}>
    <Text category='h4' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12}}>For the next twenty-five minutes you will be engaged in study. Focused on making progress.</Text>
    </View>
    
    <View style={{ marginBottom:0, justifyContent:'flex-end', alignItems:'center'}}>
    
    <View style={{flexDirection:'row',  marginBottom:12, alignItems:'center'}}>
    <Text category='c1'>Active Studiers: </Text>
    <Text  category='c1' style={{ fontWeight:'bold' }}>{activeUsers}</Text>
    </View>

    <View style={{flexDirection:'row', marginBottom:30, paddingHorizontal:16}}>
{/*     <Button status={'basic'} appearance='outline' style={{marginRight:16, flex:1}}>Back</Button> */}
    <Button style={{flex:5}} onPress={customNav}>
      Start guided study
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