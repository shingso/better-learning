import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider, useTheme } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'


const EditIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const FolderIcon = (props) => (
  <Icon {...props} name='folder-add-outline'/>
);



function NotesHome({ navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const theme = useTheme()

    const [ loading, setLoading ] = useState(true);
    const [ subjects, setSubjects ] = useState([]);



    const renderItem = (info) => (
      
      <Card onPress={()=>{navigation.navigate('NotesFocused',{ title: info.item.title, subjectID: info.item.id})}} style={styles.item}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Icon fill={theme['color-basic-600']} width={16} height={16} name='folder-outline'/>
      <Text category="s1"  style={{lineHeight:22, textAlign:'center', marginLeft:12}} >{info.item.title}</Text>
      </View>
      </Card>
      

    );


    const renderEmpty = () => (

      <Card onPress={()=>navigation.navigate('AddSubject')} style={{marginTop:8, borderWidth:1, paddingVertical:60, borderColor:theme['color-primary-600']}}>
      <View>
      <Text style={{textAlign:'center', color:theme['color-primary-600']}} category='s1'>Add a Folder</Text>
      <Text style={{marginTop:12,letterSpacing:0.2,color:theme['color-basic-600'], textAlign:'center', fontSize:14}}>You dont have any folders yet, add a folder to better organize your notes</Text>
      </View>
      </Card>
    )


   
    const renderHeader = () => (
        
    <View>
    <View style={{paddingLeft:16}}>
    <TopHeader title={'Notes Collection'}/>
    </View>
 
    <Card style={{marginTop:16, borderWidth:0.5, marginBottom:8 }}>
  {/*   <Image
          style={{
            height:120,
            width:410,
            
            marginBottom:28,
            marginTop:-16,
           
          }}
  
          source={require('../assets/images/takingnoteshome.png')}
        /> */}
    
    {/* <Text  style={{ fontSize:14, letterSpacing:0.2,marginHorizontal:32,textAlign:'center', lineHeight:24, color:theme['color-basic-600']}}>Review and organize your notes</Text> */}

    
    <View style={{flexDirection:'row', marginVertical:-12, marginHorizontal:-24 }}>
    <Button  onPress={()=>navigation.navigate('AddNotes')} accessoryLeft={EditIcon} appearance='ghost' status='primary' style={{flex:1}}>Add Note</Button>
    <Button  onPress={()=>navigation.navigate('AddSubject')} accessoryLeft={FolderIcon} appearance='ghost' style={{flex:1}}>Add Folder</Button>
    </View>
  

    </Card>
  
    <Card onPress={()=>navigation.navigate('GlobalNotes')} style={styles.item}>   
    <Text style={{textAlign:'center'}} category='s1'>All Notes</Text>
    <Text style={{marginTop:12,letterSpacing:0.2,color:theme['color-basic-600'], textAlign:'center', fontSize:14}} category='label'>A collection of your thoughts</Text>
    </Card>

    <Card onPress={()=>navigation.navigate('RecalledNotes')} style={styles.item}>
    <Text style={{textAlign:'center'}} category='s1'>Daily Recall Notes</Text>
    <Text style={{marginTop:12,letterSpacing:0.2,color:theme['color-basic-600'], textAlign:'center', fontSize:14}} category='label'>Notes from your daily recall sessions</Text>
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
    paddingVertical:12,
    alignItems:'center',
    marginVertical:8,
    borderWidth:0.5
  
   
  },

});