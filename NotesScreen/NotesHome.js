import React, { useState, useEffect, useContext } from 'react';
import {  View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { Card, List, Text, Button, Icon } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'

import Empty from '../UtilComponents/EmptyList'

const NoteIcon = (props) => (

  <Icon {...props} fill='#8F9BB3' name='menu-outline'/>

);
 
const renderHeader = () => (
    
  <View style={{marginBottom:20}}>
  <Text category='h1'>Notes</Text>
  </View>
);
  
function NotesHome(){
 
 
  
    const user = useContext(AuthContext)
    const navigation = useNavigation();

    const userID = user.uid


    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);

    const renderItem = (info) => (
    
      <TouchableOpacity onPress={()=>navigation.navigate('NotesFocused',{id:info.item.id, title:info.item.title})}>
      <Card style={styles.item}>
      <View style={{justifyContent:'space-between'}}>
      <Text category='s1'>{info.item.title}</Text>
    
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginTop:12}}>
      <Text style={{marginRight:8}} category='s1'>{info.item.noteCount}</Text>
      <Icon fill='#8F9BB3' width='25' height='25' name='menu-outline'/>
      </View>
   
      </View>
      </Card>
      </TouchableOpacity>
    );



    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('NotesCollection')

        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { title, timeStamp, noteCount } = doc.data();
            list.push({
              id: doc.id,
              title,
              timeStamp,
              noteCount
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
        FlatListProps={{navigation:navigation}}
        ListEmptyComponent={<Empty message={'hello'}/>}
        ListHeaderComponent={renderHeader}
      
        />

      </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default NotesHome


const styles = StyleSheet.create({
    container: {
      paddingVertical:12,
  
    },

    contentContainer: {
      paddingHorizontal: 20,
      paddingVertical: 8,
    
     
    },
    item: {
      marginVertical: 8,
      paddingVertical:8,
    
      
    
    },
  });
