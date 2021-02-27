import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Dimensions, Image, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { ScrollView } from 'react-native-gesture-handler';
import { endOfMonth, format } from 'date-fns'
import { StudyStatsContext } from '../StudyStats'
import { UserDataContext } from '../UserDataContext'
import auth from '@react-native-firebase/auth';

import { sessionsToHours, formatMinutes2 } from '../helperFunctions';



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
      fill:theme['color-basic-800'],
      width:22,
      height:22
    

    }

    const iconStyleStats={
      fill:theme['color-primary-600'],
      width:22,
      height:22
    }


    const headerStatStyle={
       color:theme['color-basic-700'],
       fontFamily:'OpenSans-Bold',
       fontWeight:'400'
    }


    const bodyStatsStyle={
      fontSize:20, 
      fontFamily:'OpenSans-Bold',
      fontWeight:'800',
      marginLeft:12
    }

    const labelStatsStyle={
      color:theme['text-hint-color'], 
      fontFamily:'OpenSans-Regular', 
      fontSize:13,
      fontWeight:'600'
    }


    const ListComponent = (props)=>(
      <Card onPress={()=>navigation.navigate(props.path)} style={{marginTop:8, borderWidth:0, paddingVertical:2, borderRadius:12}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Icon {...iconStyle} name={props.iconName}/>
      <Text style={{marginLeft:16}} category='s1'>{props.title}</Text>
      </View>
      </Card>
    )

    
    return (

    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={{flex: 1}}>
    <Layout level='2' style={{ flex:1, padding:16, paddingTop:20 }}>
    
    <Card style={{marginBottom:2, borderWidth:0, borderRadius:12}}>
    {/* <Image
          style={{
            height:80,
            width:500,
            marginBottom:28,
            marginTop:-16,
            marginLeft:-24,
            alignItems:'center',
            justifyContent:'center'
            
          }}
          source={require('../assets/images/settingsv1.png')}
        >
     
    </Image>
 */}
    <View style={{justifyContent:'space-between', paddingBottom:22, paddingTop:16, borderBottomColor:theme['color-basic-400'], borderBottomWidth:0.5}}>
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:12}}>
    
    <Text style={{...headerStatStyle}}>Started</Text>
    </View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon {...iconStyleStats}  name='flag'/>
    <Text style={{...bodyStatsStyle}}>{format(new Date(userStartDate.toDate()), 'MMMM d, yyyy')}</Text>
    </View>
    
    </View>


    <View style={{ justifyContent:'space-between', paddingVertical:22, borderBottomWidth:0.5, borderBottomColor:theme['color-basic-400']}}>
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:12}}>
    <Icon {...iconStyleStats} name='calendar-outline'/>
    <Text style={{...headerStatStyle}}>Days Studied</Text>
    </View>
   
    <Text style={{...bodyStatsStyle}}>{studyStatsData.uniqueDates.size}<Text style={{...labelStatsStyle}}> days</Text></Text>
    </View>


    <View style={{justifyContent:'space-between', paddingVertical:22, borderBottomWidth:0.5, borderBottomColor:theme['color-basic-400']}}>
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:12}}>
    <Icon {...iconStyleStats}  name='trending-up-outline'/>
    <Text style={{...headerStatStyle}}>Total Sessions</Text>
    </View>
    <Text style={{...bodyStatsStyle}}>{studyStatsData.timesStudied}<Text style={{...labelStatsStyle}}> sessions</Text></Text>
    </View>


    <View style={{marginBottom:8, paddingVertical:22}}>
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:12}}>
    <Icon {...iconStyleStats}  name='clock-outline'/>
    <Text style={{...headerStatStyle}}>Total Time Studied</Text>
    </View>
    <Text>{formatMinutes2(400)}</Text>
    </View>

    </Card> 


    {/* timesStudiedStat -- FOR THE ABOVE CARD (FORMATMINTUES) <ListComponent path={'ThemeSettings'} iconName={'droplet-outline'} title={'Theme Settings'}/> */}
    <ListComponent path={'TimerSettings'} iconName={'bell-outline'} title={'Session Timer Settings'}/>
    <ListComponent path={'TermsOfService'} iconName={'file-text-outline'} title={'Terms And Conditions'}/>
    <ListComponent path={'PrivacyPolicy'} iconName={'lock-outline'} title={'Privacy Policy'}/>
    <ListComponent path={'OpenSource'} iconName={'book-open-outline'} title={'Open Source Libraries'}/>


    <Card onPress={()=>signOut()} style={{marginTop:8, borderWidth:0, paddingVertical:2, borderRadius:12}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon fill={theme['color-danger-700']} width={18} height={18} name='log-out-outline'/>
    <Text style={{marginLeft:16, color:theme['color-danger-700']}} category='s1'>Sign Out</Text>
    </View>
    </Card>

    
    </Layout>
    </SafeAreaView>
    </ScrollView>
      
    );

      //we need to update state when we add an item
    
    }




export default UserInfo

