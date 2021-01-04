import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider, useTheme } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'


const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const FolderIcon = (props) => (
  <Icon {...props} name='folder'/>
);



function NotesHome({ navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const theme = useTheme()

    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);


    const renderItem = (info) => (
      
      <Card onPress={()=>{navigation.navigate('NotesFocused',{ title: info.item.title, subjectID: info.item.id})}} style={styles.item}>
      <Text category="s1" style={{lineHeight:22, textAlign:'center'}} >{info.item.title}</Text>
      </Card>
      

    );


    const renderEmpty = () => (

      <View style={{flex: 1,alignItems:'center', justifyContent:'space-between', padding:16}}>
   
      <Text style={{textAlign:'center', marginTop:20}}>Your notes will go here add a new folder and it will go here</Text>
      <Text style={{textAlign:'center', marginTop:20, marginBottom:40}}>You can press the <Icon fill={'black'} width={25} height={25} name='edit'/> on the top right to add a note</Text>
      </View>
      
    )


   
    const renderHeader = () => (
        
      <View>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
      {/* <Card style={{flex:1, marginRight:8, alignItems:'center', paddingVertical:4, borderColor:theme['color-primary-500']}}>
      <Text>Add Note</Text>
      </Card> */}
      <Button  onPress={()=>navigation.navigate('AddNotes')} accessoryLeft={EditIcon} appearance='outline' status='primary' style={{flex:1, marginRight:8}}>Add Note</Button>
      <Button  onPress={()=>navigation.navigate('AddSubject')} accessoryLeft={FolderIcon} appearance='outline' status='success' style={{flex:1, marginLeft:8}}>New Folder</Button>

      {/* <Card style={{flex:1, marginLeft:8, alignItems:'center', paddingVertical:4, borderColor:theme['color-primary-500']}}>
      <Text>Add Folder</Text>
      </Card> */}
   
      {/* <Button accessoryLeft={EditIcon}  size='small'  onPress={()=>navigation.navigate('AddNotes')}/> */}
      </View>
      
      <Card onPress={()=>navigation.navigate('GlobalNotes')} style={styles.item}>
      
      <Text style={{textAlign:'center'}} category='s1'>All Notes</Text>
      <Text style={{textAlign:'center'}} category='label'>A collection of your thoughts</Text>
      </Card>

      <Card style={styles.item}>
      <Text style={{textAlign:'center'}} category='s1'>Daily Recall Notes</Text>
      <Text style={{textAlign:'center'}} category='label'>Notes from your daily recall sessions</Text>
      </Card>

      </View>

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
      <View style={{padding:16}}>
      <TopHeader title={'Notes Collection'}/>
      </View>
      <List
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
         data={subjects}
         renderItem={renderItem}
         ListEmptyComponent={renderEmpty}
         ListHeaderComponent={renderHeader}
         />
       </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default NotesHome

const styles = StyleSheet.create({
  
  

  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  contentContainer: {
    marginVertical:12,
    marginHorizontal:20,
    paddingBottom:100,
    borderColor:'red',
    
  },

  container:{
  
  },

 
  
  item: {
    paddingVertical:8,
    alignItems:'center',
  
    marginVertical:8,
  
   
  },

});