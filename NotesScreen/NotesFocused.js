import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns'

import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Empty from '../UtilComponents/EmptyList'


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);


function NotesFocused({ route, navigation }){
    const user = useContext(AuthContext)
    const userID = user.uid
  
    const { id } = route.params

    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    
    const navigateBack = () => {
      navigation.goBack();
    };
    
    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    const renderItem = (info) => (
      
      <View
        style={styles.item}
       
       >
        <View style={{}}>
       <Text style={styles.timeText}>{format(new Date(info.item.timeStamp.toDate()), 'MMMM do yyyy')}</Text>
        <Text style={styles.noteText}>{info.item.text}</Text>
        </View>
      </View>
    );

 
    
    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(id).collection('Notes')
        return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { text, timeStamp } = doc.data();
  
            list.push({
              id: doc.id,
              text,
              timeStamp
            
            });
          });
      
          setTodos(list);
    
          if (loading) {
            setLoading(false);
          }
        });
      }, []);
    
    if (loading) {
        return null; 
    }

  

    return (
       

       

      <View style={{flex: 1}}>
      
      <TopNavigation title={id} alignment='center' accessoryLeft={BackAction}/>
    
      <List
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
         data={todos}
         renderItem={renderItem}
         ListEmptyComponent={<Empty message={'hello'}/>}
         />
 
  
       </View>
      
      
      );

      //we need to update state when we add an item
    
    }

export default NotesFocused

const styles = StyleSheet.create({
  contentContainer: {
   
  },

  item: {
  
  },
 
  
  timeText: {
   fontWeight:'bold'
  },

    
  noteText: {
    
  },


  container: {
    padding:16
  },
  
  item: {
    marginVertical:4
  },

});