import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import ProgressHeader from '../UtilComponents/ProgressHeader'
import CalendarStrip from 'react-native-calendar-strip'
import { ScrollView } from 'react-native-gesture-handler';
import { getDay, startOfWeek, endOfWeek, eachDayOfInterval, format, formatDistance, startOfMonth } from 'date-fns'


const EditIcon = (props) => (
  <Icon {...props} width={25} height={25} name='edit-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} height={20} width={20}  name='plus-outline'/>
);





function HomeScreen(){

  

    const theme = useTheme()


    const markedDatesFunc = date => {
      // Dot
      if (date.isoWeekday() === 4) { // Thursdays
        return {
          dots:[{
            color: theme['color-primary-500'],
            selectedColor: theme['color-primary-500'],
          }]
        };
      }

      if (date.isoWeekday() === 5) { 
        return {
          dots:[{
            color: theme['color-primary-500'],
            selectedColor: theme['color-primary-500'],
          }]
        };
      }

      if (date.isoWeekday() === 6) {
        return {
          dots:[{
            color: theme['color-primary-500'],
            selectedColor: theme['color-primary-500'],
            
          }]

          
        };
      }

    
    
      
      // Line
     
      return {};
      
    }


    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);
    const [ subjects, setSubjects ] = useState([]);   
    const [ currentSubject, setCurrentSubject ] = useState(null);   
    const [ currentSubjectID, setCurrentSubjectID ] = useState(null);   

  
    const renderListFooter = () => (

      <Layout style={{marginTop:12}}> 
     {/*  <Button accessoryRight={PlusIcon} size='small' onPress={()=>navigation.navigate('AddSubject')} />  */}
      </Layout>

  );

     
  const renderWelcome = () => (
      
    <View style={{marginBottom:20, justifyContent:'space-between'}}>
      
 
    <Card style={{marginBottom:16}}>
    <ImageBackground opacity={0.2} resizeMode='cover'  source={require('../assets/images/8600.5.png')} style={styles.image}>
    <Text style={{marginBottom:8}} category='s1'>What is Learning?</Text>
    <Text>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</Text>
    </ImageBackground>
    </Card>

    <Card style={{marginVertical:8, marginBottom:28}}>
    <ImageBackground opacity={0.2} resizeMode='cover'  source={require('../assets/images/8600.5.png')} style={styles.image}>
    <Text style={{marginBottom:8}} category='s1'>How should I be learning?</Text>
    <Text>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</Text>
    </ImageBackground>
    </Card>

    <Card style={{marginBottom:28}}>
    <ImageBackground opacity={0.2} resizeMode='cover' source={require('../assets/images/8600.5.png')} style={styles.image}>
    <Text style={{marginBottom:8}} category='s1'>Want to know more?</Text>
    <Text>Duis aute irure dolor in reprehenderit</Text>

    </ImageBackground>
    </Card>
    
    </View>
  );
  

  const renderHeader = () => (

   /*  <View style={{paddingBottom:8}}>

    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
    <View style={{flex:1, marginRight:12}}>
    <Button appearance='outline'>View All Notes</Button>
    </View>
    <Button style={{marginRight:8}} accessoryRight={EditIcon} size='small' appearance='outline' onPress={()=>navigation.navigate('AddNotes')}/>
    <Button accessoryRight={PlusIcon} size='small'  onPress={()=>navigation.navigate('AddNotes')}/>
    </View>
  
    </View> */

    <Card style={{height:160}}>

    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
 
    <Button style={{height:120, flex:1, marginRight:12}} appearance='ghost'>View All Notes</Button>

  {/*   <Button style={{marginRight:0}} accessoryRight={EditIcon} size='small' appearance='outline' onPress={()=>navigation.navigate('AddNotes')}/> */}
    {/* <Button accessoryRight={PlusIcon} size='small'  onPress={()=>navigation.navigate('AddNotes')}/> */}
    </View>
  
    </Card>

  
  );





    const renderItem = (info) => (
     
      <Card
        style={{ marginVertical:8 }}
        onPress={()=>navigation.navigate('NotesFocusedTEST', {subjectID :info.item.id, title:info.item.title})}
      >

      <View style={{ justifyContent:'space-between', flexDirection:'row'}}>
    
      <Text category='s1'>{info.item.title}</Text>
      {info.item.lastStudied != null && <Text style={{fontSize:10}}>Last Studed: {formatDistance(new Date(info.item.lastStudied.toDate()), new Date())} ago</Text>}
    

    
      
      </View>
      </Card>
    );

      
    
    
    
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
      return true; // disable Saturdays
    }


    

    return (

    
    
    <SafeAreaView style={{flex: 1}}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Layout level='2' style={{padding:16, flex:1}}>
    
    <Card style={{bodyPaddingHorizontal:-12}}>
    <CalendarStrip
     
      showMonth={false}
      calendarAnimation={{type: 'sequence', duration: 30}}
      daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
      style={{height:80, paddingTop: 0, paddingBottom: 0, marginHorizontal: -16,
        marginVertical: -20}}
      calendarHeaderStyle={{color: 'black'}}
      calendarColor={'white'}
      dateNumberStyle={{color:'black'}}
      dateNameStyle={{color: 'black'}}
      iconContainer={{flex: .1}}
      //max date should be last date of the current week
      maxDate={endOfCurrentWeek}
      //min date should be the last 4 weeks
      minDate={startOfCurrentMonth}
      datesBlacklist={datesBlacklistFunc}
      //iconLeft={null}
      //iconRight={null}
      //starting date should be first day of the week
      startingDate={startOfCurrentWeek}
      
      markedDates={markedDatesFunc}
 
      useIsoWeekday={false}
      disabledDateOpacity={1}


    />
    </Card>

    <Card style={{marginTop:16, height:200,backgroundColor:theme['color-primary-400'], justifyContent:'center', borderWidth:1, borderColor:theme['color-primary-500']}} onPress={()=>navigation.navigate('SetTimer')}>

    <View style={{ alignItems:'center', justifyContent:'center'}}>
    <Icon style={{marginBottom:12}} fill={theme['color-primary-800']} width={50} height={50} name='play-circle' />

    <Text style={{fontWeight:'bold', fontSize:16}} category='label'>Start a study session</Text>
    <Text style={{marginTop:8, textAlign:'center', lineHeight:20}} category='label'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Text>
   
    </View>
   
    </Card> 

   


    <Card style={{marginTop:16}} onPress={()=>{navigation.navigate('NotesRecall')}}>
    <ImageBackground opacity={0.15} resizeMode='cover'  source={require('../assets/images/8600.5.png')} style={styles.image}>
    <View style={{ alignItems:'center', justifyContent:'center'}}>

    
    <Text style={{fontWeight:'bold', fontSize:16}} category='label'>Daily Recall</Text>
    <Text style={{marginTop:8}} category='label'>Take a look at past note and write something new about it</Text>
    </View>
    </ImageBackground>
    </Card>

  {/*   <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={subjects}
        renderItem={renderItem}
        ListFooterComponent={renderListFooter}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderWelcome}
        showsVerticalScrollIndicator={false}
        /> */}
    <View style={{marginTop:16}}>
    {renderHeader()}
    </View>

    </Layout>

   
    {/* <Button  style={{marginVertical:12, width:64, height:64, borderRadius:32,position: 'absolute', bottom: 20,                                                    
    right: 20, zIndex:5 }} accessoryRight={PlusIcon} onPress={()=>navigation.navigate('AddSubject')} /> */}
    
    </ScrollView>

    </SafeAreaView>
  
      
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
    marginTop:16
  },

  image: {
    
    resizeMode: "center",
   
    margin:-24,
    padding:24,
    paddingVertical:60
    
  },
});

export default HomeScreen

