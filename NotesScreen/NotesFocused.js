import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Empty from '../UtilComponents/EmptyList'
import TopHeader from '../UtilComponents/TopHeader'


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);


function NotesFocused({ route, navigation }){
  
    const user = useContext(AuthContext)
    const userID = user.uid
  
    const { id } = route.params
    const { title } = route.params
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    
    const renderItem = (info) => (
      
      <View style={styles.item}>
      <View>
      <Text style={{marginBottom:12}} category='label'>{format(new Date(info.item.timeStamp.toDate()), 'MMMM do yyyy')}</Text>
      <Text>{info.item.text}</Text>
      </View>
      </View>
    );

   
    const renderHeader = () => (
        
      <View>
      <TopHeader/>
      <Text category='s1'>{title}</Text>
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
       

       

      <SafeAreaView style={{flex: 1}}>
      
   
      <List
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
         data={todos}
         renderItem={renderItem}
         ListEmptyComponent={<Empty message={'Your notes will be placed here'}/>}
         
         ListHeaderComponent={renderHeader}
         />
 
  
       </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default NotesFocused

const styles = StyleSheet.create({
  
  



  container: {
  
  },

  contentContainer: {
    marginVertical:8,
    marginHorizontal:16,
    flexGrow: 1
  },
  
  
  item: {
    marginVertical:20
  },

});