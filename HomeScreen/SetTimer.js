import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, StyleSheet, ImageBackground} from 'react-native'
import { Button, Icon,  Card, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import firestore from '@react-native-firebase/firestore';
import { incrementActiveUsers } from '../helperFunctions';




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
    <SafeAreaView style={{flex: 1, padding:16}}>
    <TopHeader/>
    <View style={{justifyContent:'space-between', flex:1}}>
    <View style={{alignSelf:'flex-end'}}>
    <Text category='s1'>Active Studiers</Text>
    <Text style={{ alignSelf:'flex-end', fontWeight:'bold' }}>{activeUsers}</Text>
    </View>

    <View>
    <Text category='h4' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
    </View>
    
    <View style={{ marginBottom:36 , justifyContent:'flex-end', alignItems:'center'}}>
    <Button style={{marginBottom:30, width:300,}} onPress={customNav}>
      start session
    </Button>

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