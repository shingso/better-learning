import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import ProgressHeader from '../UtilComponents/ProgressHeader'
import { format, formatDistance } from 'date-fns'




const EditIcon = (props) => (
  <Icon {...props} width={25} height={25} name='edit-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} height={20} width={20}  name='plus-outline'/>
);



function HomeScreen(){

    const theme = useTheme()

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

    <View style={{paddingBottom:8}}>
{/*     <ProgressHeader messageNumber={1}/> */}
    

 
    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
    <View style={{flex:1, marginRight:12}}>
    <Button appearance='outline'>View All Notes</Button>
    </View>
    <Button style={{marginRight:8}} accessoryRight={EditIcon} size='small' appearance='outline' onPress={()=>navigation.navigate('AddNotes')}/>
    <Button accessoryRight={PlusIcon} size='small'  onPress={()=>navigation.navigate('AddNotes')}/>
    </View>
    
 
    


   {/*  {
    subjects.length != 0 ? 
    <Text category={'label'}>Your Subjects:</Text>:
    <Text category={'label'}>To get the most out of this app, check out the guides below:</Text>
    } */}
  
    </View>

  
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


    return (

    
    
    <SafeAreaView style={{flex: 1}}>
    
    <Layout level='2' style={{padding:16, flex:1}}>


    <Card style={{marginTop:12, backgroundColor:theme['color-primary-500'], borderWidth:1, borderColor:theme['color-primary-500']}} onPress={()=>navigation.navigate('SetTimer')}>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
    <Icon style={{marginRight:12}} fill={theme['color-primary-800']} width={45} height={45} name='play-circle' />

    <Text style={{fontWeight:'bold', fontSize:16}} category='label'>Start a study session</Text>

   
    </View>
    </Card>


    <Card style={{marginTop:20}} onPress={()=>{navigation.navigate('NotesRecall')}}>
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
    <View style={{flex:1, justifyContent:'flex-end'}}>
    {renderHeader()}
    </View>

    </Layout>

   
    {/* <Button  style={{marginVertical:12, width:64, height:64, borderRadius:32,position: 'absolute', bottom: 20,                                                    
    right: 20, zIndex:5 }} accessoryRight={PlusIcon} onPress={()=>navigation.navigate('AddSubject')} /> */}
    


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

