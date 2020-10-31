import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, TouchableOpacity} from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { Card, List, Text, Button, Icon } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'

import Empty from '../UtilComponents/EmptyList'

const NoteIcon = (props) => (

  <Icon {...props} name='file-text-outline'/>

);
 
const renderHeader = () => (
    
  <View>
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
    
      <TouchableOpacity onPress={()=>navigation.navigate('NotesFocused',{id:info.item.id})}>
      <View style={styles.item}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Text category='s1'>{info.item.title}</Text>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text category='label'>{info.item.noteCount}</Text>
      <Button appearance='ghost' accessoryRight={NoteIcon} onPress={()=>navigation.navigate('NotesFocused',{id:info.item.id, title:info.item.title})}/>
      </View>
      </View>
      </View>
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
       

        <View style={{flex: 1}}>
     
        <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={todos}
        renderItem={renderItem}
        FlatListProps={{navigation:navigation}}
        ListEmptyComponent={<Empty message={'hello'}/>}
        ListHeaderComponent={renderHeader}
      
        />

      </View>
      
      
      );

      //we need to update state when we add an item
    
    }

export default NotesHome


const styles = StyleSheet.create({
    container: {
      paddingVertical:12
    },
    contentContainer: {
      paddingHorizontal: 20,
    paddingVertical: 8,
  
     
    },
    item: {
      marginVertical: 16,
    },
  });
