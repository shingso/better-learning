import React, { useState, useEffect, useContext, useRef } from 'react';
import {  View, SafeAreaView, Dimensions, Image, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme} from '@ui-kitten/components';
import CalendarStrip from 'react-native-calendar-strip'
import { ScrollView } from 'react-native-gesture-handler';
import { getDay, startOfWeek, endOfWeek, format, subDays} from 'date-fns'
import { StudyStatsContext } from '../StudyStats'
import { UserDataContext } from '../UserDataContext'
import IOSShadowView from '../UtilComponents/IOSShadowView'
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen(){


    const theme = useTheme()
    const studyStatsData = useContext(StudyStatsContext)
    const timesStudiedToday = studyStatsData.timesStudiedToday


    const markedDatesFunc = date => {

      let result = new Date(date)
      let newDateConverted = format(result, 'yyyy-MM-dd')
    
      //if the date is in the dictonary then mark it. 
      if (studyStatsData.uniqueDates.has(newDateConverted)) {
     
        return {
          dots:[{
            color: theme['color-primary-500'],
            selectedColor: theme['color-primary-500'],
          }]
        };
      }


      return {};
      
    }
  


  useEffect(() => {
      
    async function getCurrentSession(){
      const emptySession = [false, null]
      try {
          const value = await AsyncStorage.getItem('@sessionStatus')
          if(value !== null) {
            let parsedValue = JSON.parse(value)
            if(parsedValue[0] == true){
              navigation.navigate('Session')
            }
        
          } else {
              AsyncStorage.setItem('@sessionsStatus', JSON.stringify(emptySession))
            
          }
        } catch(e) {
          console.log(e)
        }
  }


    getCurrentSession()

  }, []);

  
    const screenWidth = Dimensions.get('window').width - 16
    const navigation = useNavigation();
    const userData = useContext(UserDataContext)
    const currentDate = new Date()
    const startOfCurrentWeek = startOfWeek(currentDate)
    const endOfCurrentWeek =  endOfWeek(currentDate)
    const startDate = userData.timeStamp.toDate()
    const minDateForStrip = subDays(startDate , getDay(startDate))

    const endOfCurrentWeekPlus = subDays(endOfCurrentWeek, 2)


    const datesBlacklistFunc = date => {

      if(format(date.toDate(), 'MMM d yyyy') == format(new Date(), 'MMM d yyyy')){
        return false
      }

      return true; 

    }

     

    return (

    <ScrollView  showsVerticalScrollIndicator={false}>
    <SafeAreaView style={{flex: 1}}>
    <Layout level='2' style={{ flex:1 , paddingVertical:20, paddingHorizontal:16, paddingBottom:100}}>
    
    <IOSShadowView>
    <Card style={{bodyPaddingHorizontal:-12, borderWidth:0, borderRadius:12, elevation:1}}>

    <CalendarStrip
      maxDate={endOfCurrentWeek}
      minDate={minDateForStrip}
      datesBlacklist={datesBlacklistFunc}
      startingDate={startOfCurrentWeek}
      selectedDate={new Date()}
      highlightDateNumberStyle={{color:theme['color-info-600']}}
      highlightDateNameStyle={{color:theme['color-info-600'], fontWeight:'bold'}}
      showMonth={false}
      calendarAnimation={{type:"parallel", duration:0}}
      style={{height:80, paddingTop: 0, paddingBottom: 0, marginHorizontal: -16,
        marginVertical: -20, backgroundColor:theme["background-basic-color-1"]}}
      calendarHeaderStyle={{color:'white'}}
      calendarColor={theme['background-basic-color-1']}
      dateNumberStyle={{color:theme["text-basic-color"]}}
      disabledDateNameStyle={{color:theme['text-basic-color']}}
      disabledDateNumberStyle={{color:theme['text-basic-color']}}
      dateNameStyle={{backgroundColor:theme['color-basic-100']}}
      iconContainer={{flex: .1, height:80, backgroundColor:theme["background-basic-color-1"]}}  
      leftSelector={<View><Icon fill={theme['text-basic-color']} height={20} width={20}  name='arrow-ios-back-outline'/></View>}
      rightSelector={<View><Icon fill={theme['text-basic-color']} height={20} width={20}  name='arrow-ios-forward-outline'/></View>}
      markedDates={markedDatesFunc}
      useIsoWeekday={false}
      disabledDateOpacity={1}
    />

    </Card>
                                                                                                                                                                                             
  
    <Card style={{marginTop:12,borderWidth:0, borderRadius:12, elevation:1}}  onPress={()=>navigation.navigate('Session')}>
    <View style={{alignItems:'center', justifyContent:'center'}}>
    <Image
          style={{
            height:200,
            width: screenWidth,
            marginBottom:28,
            marginTop:-16,
          }}
          source={require('../assets/images/studytestingv6-01.png')}
      />
      
    <Text category='h6' style={{color:theme['color-primary-700'], fontSize:18, letterSpacing:0.5}}>Start Study Session</Text>
    <View style={{position:'absolute', right:-12, top:-8, alignItems:'flex-end', backgroundColor:null, paddingBottom:4, paddingHorizontal:8,borderRadius:8}}>
    <Text style={{color:theme['color-basic-100'], fontSize:20, fontFamily:'Poppins-SemiBold', fontWeight:'500'}}><Text style={{color:theme['color-basic-100'], fontSize:24, fontFamily:'Poppins-Bold', fontWeight:'700'}}>{timesStudiedToday}</Text>{timesStudiedToday != 1 ? ' sessions' : ' session'}</Text>  
    <Text style={{color:theme['color-basic-100'], fontSize:20, fontFamily:'Poppins-SemiBold', marginTop:Platform.OS ==='ios' ? -6:-12, fontWeight:'500'}}>{'today'}</Text>  
    </View> 
    <Text category='p1' style={{marginTop:12, marginBottom:28, letterSpacing:0.2,marginHorizontal:16,textAlign:'center', lineHeight:24, color:theme['color-basic-700']}}>Learn more effectively with a guided study session</Text>
    </View>
    </Card> 

    <Card onPress={()=>{navigation.navigate('NotesHome')}} style={{marginTop:12, justifyContent:'center', alignItems:'center', borderWidth:0, borderRadius:12, elevation:1}}>
    <Image
          style={{
            height:140,
            width:screenWidth,
            marginBottom:28,
            marginTop:-16,
          }}
          source={require('../assets/images/yournotesv1orange.png')}
        />
    <View style={{alignItems:'center'}}>
    <Text category='h6'>Your Notes</Text>
    <Text category='p1' style={{marginTop:12, marginBottom:24,letterSpacing:0.2,color:theme['color-basic-700'], marginHorizontal:30, lineHeight:24, textAlign:'center'}}>A collection of your thoughts</Text>
    </View>
    </Card>




    </IOSShadowView>
  
    
    </Layout>
    </SafeAreaView>
    </ScrollView>
    
      
    );

    
    }


export default HomeScreen

