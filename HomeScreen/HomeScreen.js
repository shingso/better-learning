import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import CalendarStrip from 'react-native-calendar-strip'
import { ScrollView } from 'react-native-gesture-handler';
import { getDay, startOfWeek, endOfWeek, eachDayOfInterval, format, formatDistance, startOfMonth, parseISO } from 'date-fns'
import { StudyStatsContext } from '../StudyStats'



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


    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);
    const [ subjects, setSubjects ] = useState([]);   
    const [ currentSubject, setCurrentSubject ] = useState(null);   


  
    
    useEffect(() => {

        const ref = firestore().collection('Users').doc(userID).collection('Subjects')
        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { title, timeStamp } = doc.data();
            list.push({
              id: doc.id,
              title,
              timeStamp,
            
            });
          });
  
          setSubjects(list);

          if(list.length != 0){
            setCurrentSubject(list[0].title)
          }
          
          if (loading) {
            setLoading(false);
          }
          

        });
      }, []);
    
    if (loading) {
        return null; 
    }

    const currentDate = new Date()
    const startOfCurrentWeek = startOfWeek(currentDate)
    const endOfCurrentWeek =  endOfWeek(currentDate)
    const startOfCurrentMonth = startOfMonth(currentDate)

    
    const datesBlacklistFunc = date => {
      return true; 
    }


    return (

    
    <Layout level='2' style={{ flex:1 }}>
    <ScrollView  showsVerticalScrollIndicator={false}>
   
    <SafeAreaView style={{flex: 1, paddingVertical:20, paddingHorizontal:16}}>
    <Card style={{bodyPaddingHorizontal:-12}}>
    
    
    <CalendarStrip
     //currently not getting rerendered on change of theme
      showMonth={false}
      calendarAnimation={{type:"parallel", duration:0}}
      daySelectionAnimation={{type: 'background', duration: 300}}
      style={{height:80, paddingTop: 0, paddingBottom: 0, marginHorizontal: -16,
        marginVertical: -20, backgroundColor:theme["background-basic-color-1"]}}
      calendarHeaderStyle={{color:'white'}}
      calendarColor={theme['background-basic-color-1']}
      dateNumberStyle={{color:theme["text-basic-color"]}}

      disabledDateNameStyle={{color:theme['text-basic-color']}}
      disabledDateNumberStyle={{color:theme['text-basic-color']}}
      dateNameStyle={{backgroundColor:'white'}}
      iconContainer={{flex: .1, height:80, backgroundColor:theme["background-basic-color-1"]}}  
      maxDate={endOfCurrentWeek}
      minDate={startOfCurrentMonth}
      datesBlacklist={datesBlacklistFunc}
      //iconLeft={null}
      //iconRight={null}
      
      startingDate={startOfCurrentWeek}
      leftSelector={<View><Icon fill={theme['text-basic-color']} height={20} width={20}  name='arrow-ios-back-outline'/></View>}
      rightSelector={<View><Icon fill={theme['text-basic-color']} height={20} width={20}  name='arrow-ios-forward-outline'/></View>}
      markedDates={markedDatesFunc}
 
      useIsoWeekday={false}
      disabledDateOpacity={1}


    />
    </Card>

    <Card style={{marginTop:16, height:210, justifyContent:'center', borderWidth:1.3, borderColor:theme['color-primary-400']}} onPress={()=>navigation.navigate('SetTimer')}>
    <View style={{ alignItems:'center', justifyContent:'center'}}>
    <Icon style={{marginBottom:16}} fill={theme['color-primary-400']} width={50} height={50} name='play-circle' />
    <Text category='h6'>Start a study session</Text>
    <Text style={{marginTop:12, textAlign:'center', lineHeight:20}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Text>
    </View>
    </Card> 

   


    <Card style={{marginTop:16}} onPress={()=>{navigation.navigate('NotesRecallExplain')}}>
    <ImageBackground opacity={0.15} resizeMode='cover'  source={require('../assets/images/8600.5.png')} style={styles.image}>
    <View style={{ alignItems:'center', justifyContent:'center'}}>
    <Text category='h6'>Daily Recall</Text>
    <Text style={{marginTop:16, textAlign:'center', lineHeight:20}}>Take a look at past note and write something new about it</Text>
    </View>
    </ImageBackground>
    </Card>

 
    <Card onPress={()=>{navigation.navigate('NotesHome')}} style={{marginTop:16, justifyContent:'center', alignItems:'center'}}>
    <ImageBackground opacity={0.3} resizeMode='cover'  source={require('../assets/images/viewNotesv2.png')} style={styles.image}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text category='h6'>Your Notes</Text>
    <Text style={{marginTop:16}}>A collection of your thoughts and notes</Text>

    </View>
    </ImageBackground>
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

