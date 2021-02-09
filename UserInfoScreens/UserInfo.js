import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Dimensions, Image, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { ScrollView } from 'react-native-gesture-handler';
import { endOfMonth, format } from 'date-fns'
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { UserDataContext } from '../UserDataContext'
import auth from '@react-native-firebase/auth';

import { sessionsToHours, formatMinutes } from '../helperFunctions';



function signOut(){     
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}


function UserInfo(){

  


    const studyStatsData = useContext(StudyStatsContext)
    const userData = useContext(UserDataContext)
    const theme = useTheme()

    const navigation = useNavigation();
    const userStartDate = userData.timeStamp  
    const timesStudiedStat = studyStatsData.totalMinutesStudied

    const iconStyle={
      fill:theme['color-basic-500'],
      width:18,
      height:18

    }


    const ListComponent = (props)=>(
      <Card onPress={()=>navigation.navigate(props.path)} style={{marginTop:8, borderWidth:0.5, paddingVertical:2}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Icon {...iconStyle} name={props.iconName}/>
      <Text style={{marginLeft:16}} category='s1'>{props.title}</Text>
      </View>
      </Card>
    )

    
    return (

    <ScrollView showsVerticalScrollIndicator={false}>
    <Layout level='2' style={{ flex:1, padding:16, paddingTop:20 }}>
    <SafeAreaView style={{flex: 1}}>
    
    <Card style={{marginBottom:2, paddingBottom:8, borderWidth:0.5}}>
    <Image
          style={{
            height:80,
            width:500,
            marginBottom:28,
            marginTop:-16,
            marginLeft:-24,
            alignItems:'center',
            justifyContent:'center'
            
          }}
          source={require('../assets/images/yournotesv1orange.png')}
        >
       {/*  <View style={{backgroundColor:theme['color-primary-600'], paddingVertical:12, paddingHorizontal:32, borderRadius:30}}>
        <Text category={'s1'} style={{fontSize:18, color:'white'}}>Settings</Text>
        </View> */}
    </Image>

    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:32, paddingTop:16}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon {...iconStyle}  name='flag-outline'/>
    <Text style={{marginLeft:16}} category={'s1'}>Started</Text>
    </View>
    <Text style={{fontWeight:'bold'}}>{format(new Date(userStartDate.toDate()), 'MMMM d yyyy')}</Text>
    </View>


    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:32}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon {...iconStyle} name='calendar-outline'/>
    <Text style={{marginLeft:16}} category={'s1'}>Days Studied</Text>
    </View>
   
    <Text category='s1'>{studyStatsData.uniqueDates.size}<Text style={{color:theme['text-hint-color']}} category='c2'> days</Text></Text>


    </View>


    <View style={{marginBottom:32, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon {...iconStyle}  name='trending-up-outline'/>
    <Text style={{marginLeft:16}} category={'s1'}>Total Sessions</Text>
    </View>
    <Text style={{fontSize:14,fontWeight:'bold'}}>{studyStatsData.timesStudied}<Text style={{color:theme['text-hint-color']}} category='c2'> sessions</Text></Text>
    </View>

    <View style={{marginBottom:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon {...iconStyle}  name='clock-outline'/>
    <Text style={{marginLeft:16}} category={'s1'}>Total Time</Text>
    </View>
    <Text>{formatMinutes(timesStudiedStat)}</Text>
    </View>

    </Card> 


    <ListComponent path={'ThemeSettings'} iconName={'droplet-outline'} title={'Theme Settings'}/>
    <ListComponent path={'TimerSettings'} iconName={'bell-outline'} title={'Session Timer Settings'}/>
    <ListComponent path={'TermsOfService'} iconName={'file-text-outline'} title={'Terms And Conditions'}/>
    <ListComponent path={'PrivacyPolicy'} iconName={'lock-outline'} title={'Privacy Policy'}/>
    <ListComponent path={'OpenSource'} iconName={'book-open-outline'} title={'Open Source Libraries'}/>


    <Card onPress={()=>signOut()} style={{marginTop:8, borderWidth:0.5, paddingVertical:2}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon fill={theme['color-danger-700']} width={18} height={18} name='log-out-outline'/>
    <Text style={{marginLeft:16, color:theme['color-danger-700']}} category='s1'>Sign Out</Text>
    </View>
    </Card>

      
    

    </SafeAreaView>
    </Layout>
    </ScrollView>
      
    );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({

});

export default UserInfo
