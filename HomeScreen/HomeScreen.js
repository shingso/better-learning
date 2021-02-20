import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme , withStyles} from '@ui-kitten/components';
import CalendarStrip from 'react-native-calendar-strip'
import { ScrollView } from 'react-native-gesture-handler';
import { getDay, startOfWeek, endOfWeek, eachDayOfInterval, format, formatDistance, startOfMonth, parseISO, startOfDay, differenceInDays } from 'date-fns'
import { StudyStatsContext } from '../StudyStats'
import { UserDataContext } from '../UserDataContext'




function HomeScreen(){

    const ref = useRef(markedDatesFunc);


    const theme = useTheme()
    const studyStatsData = useContext(StudyStatsContext)
    const timesStuidedToday = studyStatsData.timesStudiedToday

    useEffect(() => {
    
    }, [theme]);

    const markedDatesFunc = date => {
      // Dot

      let result = new Date(date)
      let newDateConverted = format(result, 'yyyy-MM-dd')
    

      //if the date is in the dictonary then mark it. 
      if (studyStatsData.uniqueDates.has(newDateConverted)) { // Thursdays
     
        return {
          dots:[{
            color: theme['color-primary-500'],
            selectedColor: theme['color-primary-500'],
          }]
        };
      }


      return {};
      
    }

    const screenWidth = Dimensions.get('window').width - 16

    const navigation = useNavigation();
    const userData = useContext(UserDataContext)

    const currentDate = new Date()
    const startOfCurrentWeek = startOfWeek(currentDate)
    const endOfCurrentWeek =  endOfWeek(currentDate)
    const startOfCurrentMonth = startOfMonth(currentDate)
    //const startDate = userData.timeStamp.toDate()

    
    const getRecallAvailable = () => {

      if(userData){
        if(userData.lastRecalled == null){
          return true
        }
      } else {
        return true
      }
      const startOfLastRecalled = startOfDay(userData.lastRecalled.toDate())
      const currentDate = new Date()
      const differenceInLastRecall = differenceInDays(currentDate, startOfLastRecalled)
      if(differenceInLastRecall > 0){
        return true
      } 
      return false
    }

    const datesBlacklistFunc = date => {

      if(format(date.toDate(), 'MMM d yyyy') == format(new Date(), 'MMM d yyyy')){
        return false
      }

      return true; 

    }

     


    return (

    
    <Layout level='2' style={{ flex:1 }}>
    <ScrollView  showsVerticalScrollIndicator={false}>
    <SafeAreaView style={{flex: 1, paddingVertical:20, paddingHorizontal:16}}>
    <Card style={{bodyPaddingHorizontal:-12, borderWidth:0.5}}>

    <CalendarStrip
     //currently not getting rerendered on change of theme
      selectedDate={new Date()}
      highlightDateNumberStyle={{color:theme['color-info-600']}}
      highlightDateNameStyle={{color:theme['color-info-600'], fontWeight:'bold'}}
      showMonth={false}
      calendarAnimation={{type:"parallel", duration:0}}
      ref={ref}
      style={{height:80, paddingTop: 0, paddingBottom: 0, marginHorizontal: -16,
        marginVertical: -20, backgroundColor:theme["background-basic-color-1"]}}
      calendarHeaderStyle={{color:'white'}}
      calendarColor={theme['background-basic-color-1']}
      dateNumberStyle={{color:theme["text-basic-color"]}}
      disabledDateNameStyle={{color:theme['text-basic-color']}}
      disabledDateNumberStyle={{color:theme['text-basic-color']}}
      dateNameStyle={{backgroundColor:theme['color-basic-100']}}
      iconContainer={{flex: .1, height:80, backgroundColor:theme["background-basic-color-1"]}}  
      maxDate={endOfCurrentWeek}
      minDate={startOfCurrentMonth}
      datesBlacklist={datesBlacklistFunc}
      startingDate={startOfCurrentWeek}
      leftSelector={<View><Icon fill={theme['text-basic-color']} height={20} width={20}  name='arrow-ios-back-outline'/></View>}
      rightSelector={<View><Icon fill={theme['text-basic-color']} height={20} width={20}  name='arrow-ios-forward-outline'/></View>}
      markedDates={markedDatesFunc}
      useIsoWeekday={false}
      disabledDateOpacity={1}
    />
    </Card>

{/* 
    <Card disabled={false} style={{marginTop:16, borderWidth:0.5}} onPress={()=>{navigation.navigate('NotesRecallExplain')}}>
  
    <View style={{ flexDirection:'row', justifyContent:'space-between', paddingVertical:4 }}>
    <Text style={{marginRight:20, fontSize:15, fontWeight:'bold', letterSpacing:0.5}} >Daily Recall</Text>
    <View style={{ flexDirection:'row', alignItems:'center',}}>
    {getRecallAvailable() ?
    <Icon name='alert-circle' fill={theme['color-info-500']} height={14} width={14}/> :
    <Icon name='checkmark-circle' fill={theme['color-primary-700']} height={15} width={15}/>
    }
    <Text category='s1' style={{ marginLeft:6, color: getRecallAvailable() ? theme['color-info-500'] : theme['color-primary-700'] }}>{getRecallAvailable() ? 'Available' : 'Completed'}</Text>
    </View>
    </View>

    </Card> */}



    <Card style={{marginTop:16,borderWidth:0.6}}  onPress={()=>navigation.navigate('Session')}>
    <View style={{alignItems:'center', justifyContent:'center'}}>
    <Image
          style={{
            height:160,
            width: screenWidth,
            marginBottom:28,
            marginTop:-16,
          }}
          source={require('../assets/images/startstudying.png')}
      />
      
    <Text category='h6' style={{fontWeight:'bold',color:theme['color-primary-800'], fontSize:18, letterSpacing:0.5}}>Start Study Session</Text>
    
    <View style={{position:'absolute', right:-12, top:-8, flexDirection:'row', alignItems:'center', backgroundColor:theme['color-basic-100'], padding:8, paddingHorizontal:12,borderRadius:4}}>
    <Text style={{color:theme['color-primary-800'], fontSize:16, fontWeight:'bold'}}>{timesStuidedToday}</Text>  
    </View> 
    <Text category='p1' style={{marginTop:12, marginBottom:28, letterSpacing:0.2,marginHorizontal:16,textAlign:'center', lineHeight:24, color:theme['text-hint-color']}}>Learn more effectively with a guided study session</Text>
    </View>
    </Card> 

    <Card onPress={()=>{navigation.navigate('NotesHome')}} style={{marginTop:16, justifyContent:'center', alignItems:'center', borderWidth:0.5 }}>
    <Image
          style={{
            height:100,
            width:screenWidth,
            marginBottom:28,
            marginTop:-16,
          }}
          source={require('../assets/images/yournotesv2.png')}
        />
    <View style={{alignItems:'center'}}>
    <Text category='h6'>Your Notes</Text>
    <Text category='p1' style={{marginTop:12, marginBottom:24,letterSpacing:0.2,color:theme['text-hint-color'], marginHorizontal:30, lineHeight:24, textAlign:'center'}}>A collection of your thoughts</Text>
    </View>
    </Card>
    </SafeAreaView>
    </ScrollView>

   
    </Layout>
      
    );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({
  item: {

    marginBottom:8,

  },
  //contanier that holds everything 
  contentContainer: {

  },
  
  container:{
    marginTop:16,
    backgroundColor:'red'
  },

  image: {

    margin:-24,
    padding:24,
    paddingVertical:60
    
  },
});

export default HomeScreen

export const ThemedAwesomeView = withStyles(HomeScreen, (theme) => ({
  awesome: {
    backgroundColor: theme['color-primary-500'],
  },
}));