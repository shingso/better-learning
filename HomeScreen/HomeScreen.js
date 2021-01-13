import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import CalendarStrip from 'react-native-calendar-strip'
import { ScrollView } from 'react-native-gesture-handler';
import { getDay, startOfWeek, endOfWeek, eachDayOfInterval, format, formatDistance, startOfMonth, parseISO, startOfDay, differenceInDays } from 'date-fns'
import { StudyStatsContext } from '../StudyStats'
import { UserDataContext } from '../UserDataContext'


function HomeScreen(){

  

    const theme = useTheme()
    const studyStatsData = useContext(StudyStatsContext)

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
    const userLastRecalled = userData.lastRecalled
    const currentDate = new Date()
    const startOfCurrentWeek = startOfWeek(currentDate)
    const endOfCurrentWeek =  endOfWeek(currentDate)
    const startOfCurrentMonth = startOfMonth(currentDate)

    
    const getRecallAvailable = () => {

      const startOfLastRecalled = startOfDay(userLastRecalled.toDate())
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


    <Card disabled={!getRecallAvailable()} style={{marginTop:16, borderWidth:0.5}} onPress={()=>{navigation.navigate('NotesRecallExplain')}}>
  
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

    </Card>



    <Card style={{marginTop:16,borderWidth:0.6}}  onPress={()=>navigation.navigate('SetTimer')}>
    <View style={{  alignItems:'center', justifyContent:'center'}}>
    {/* <Icon style={{marginBottom:16}} fill={theme['color-primary-400']} width={45} height={45} name='play-circle' /> borderColor:theme['color-primary-700'] */}
     <Image
          style={{
            height:160,
            width: screenWidth,
            marginBottom:28,
            marginTop:-16,

            
          
          }}

          

          source={require('../assets/images/manstudying.png')}
        />
      
    <Text category='h6' style={{fontWeight:'bold',color:theme['color-primary-800'], fontSize:18, letterSpacing:0.5}}>Start Study Session</Text>
    <Text  style={{marginTop:12, marginBottom:28,fontSize:14, letterSpacing:0.2,marginHorizontal:16,textAlign:'center', lineHeight:24, color:theme['color-basic-600']}}>Stay focused and learn more effectively with a guided study session</Text>

    </View>
    </Card> 

   

{/* 
    <Card disabled={!getRecallAvailable()} style={{marginTop:16}} onPress={()=>{navigation.navigate('NotesRecallExplain')}}>
    <ImageBackground opacity={0.00} resizeMode='cover'  source={require('../assets/images/8600.5.png')} style={styles.image}>
    <View style={{ alignItems:'center', justifyContent:'center' }}>
    <Text category='h6'>Daily Recall</Text>
    <View style={{marginTop:8, flexDirection:'row', alignItems:'center'}}>
    {getRecallAvailable() ?
    <Icon name='alert-circle-outline' fill={theme['color-info-500']} height={14} width={14}/> :
    <Icon name='checkmark-circle' fill={theme['color-primary-700']} height={15} width={15}/>
    }
    <Text status={'info'} style={{marginLeft:4,color: getRecallAvailable() ? theme['color-info-500'] : theme['color-primary-700'] }}>{getRecallAvailable() ? 'Available' : 'Completed for today'}</Text>
    </View>
    <Text style={{marginTop:16, textAlign:'center', lineHeight:20}}>Take a look at past note and write some thoughts about it</Text>
    </View>
    </ImageBackground>
    </Card>
    
    //navigation.navigate('NotesHome') */}

    
    <Card onPress={()=>{navigation.navigate('NotesHome')}} style={{marginTop:16, justifyContent:'center', alignItems:'center', borderWidth:0.5 }}>
    <Image
          style={{
            height:120,
            width:screenWidth,
            
            marginBottom:28,
            marginTop:-16,
            transform: [
              { scaleX: -1 }
            ]
          }}
  
          source={require('../assets/images/womenthinking.png')}
        />
    <View style={{alignItems:'center'}}>
    <Text category='h6' >Your Notes</Text>
    <Text style={{marginTop:12, marginBottom:24,letterSpacing:0.2,color:theme['color-basic-600']}}>A collection of your thoughts</Text>
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

