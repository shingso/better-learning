import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'


const EditIcon = (props) => (
  <Icon {...props} width={25} height={25} name='edit-outline'/>
);


function NotesHome({ navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid

    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);


    const renderItem = (info) => (
      
      <Card style={styles.item}>
      <Text style={{lineHeight:22}} >{info.item.title}</Text>
      </Card>
      

    );


    const renderEmpty = () => (

      <View style={{flex: 1,alignItems:'center', justifyContent:'space-between', padding:16}}>
   
      <Image
        style={{width: 650, height: 250, resizeMode:'contain'}}
        source={require('../assets/images/notesv1.png')}
      />

      <Text style={{textAlign:'center', marginTop:20}}>If you come up with thoughts write it down, typing it out will reinforce the idea in our heads</Text>
      <Text style={{textAlign:'center', marginTop:20, marginBottom:40}}>You can press the <Icon fill={'black'} width={25} height={25} name='edit'/> on the top left to add a note when you make connections about new ideas</Text>
      </View>
      
    )


   
    const renderHeader = () => (
        
      <View>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
      <Card style={{flex:1, marginRight:8, alignItems:'center', paddingVertical:4}}>
      <Text>Add Note</Text>
      </Card>

      <Card style={{flex:1, marginLeft:8, alignItems:'center', paddingVertical:4}}>
      <Text>Add Subject</Text>
      </Card>
   
      {/* <Button accessoryLeft={EditIcon}  size='small'  onPress={()=>navigation.navigate('AddNotes')}/> */}
      </View>
      
      <Card onPress={()=>navigation.navigate('GlobalNotes')} style={styles.item}>
      <Text style={{lineHeight:22}}>All Notes</Text>
      </Card>

      <Card style={styles.item}>
      <Text style={{lineHeight:22}}>Daily Recall Notes</Text>
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
      <TopHeader/>
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
    paddingVertical:16,
 
    marginVertical:8,
  
   
  },

});