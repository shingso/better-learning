import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Divider } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'

const EditIcon = (props) => (
    <Icon {...props} name='edit-2'/>
  );

  const PlayIcon = (props) => (
    <Icon {...props}  name='play-circle'/>
  );
  
  const renderHeader = () => (
    
    <View>
    <Text category='h1'>Home</Text>
    </View>
  );

function HomeScreen(){
    const user = useContext(AuthContext)

    const userID = user.uid

    const navigation = useNavigation();

    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    
    
    const renderListFooter = () => (
      <View>
          <Button style={{margin:16}} onPress={()=>navigation.navigate('AddSubject')}>
            ADD 
          </Button>
        
      </View>
  );
  

    const renderItem = (info) => (
      
      <View
        style={styles.item}
       >

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <View>
      <Text category='s1'>
        {info.item.title} 
      </Text>
      <Text category='s2'>
        Last Studied: {info.item.title} 
      </Text>
      </View>

        <View style={{flexDirection:'row'}}>
        <Button accessoryLeft={EditIcon} appearance={'ghost'} onPress={()=>navigation.navigate('AddNotes', {id:info.item.id})}/>
        <Button accessoryLeft={PlayIcon} appearance={'ghost'} onPress={()=>navigation.navigate('SetTimer', {id:info.item.id})}/>
        </View>
        </View>
      </View>
    );
    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('NotesCollection')

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
        ListFooterComponent={renderListFooter}
        ListHeaderComponent={renderHeader}
        />


      </View>
      
      
      );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({
  item: {
    height:100,
    justifyContent:'center',
 
    flex:1
  
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  
   
  },
  
  container:{
    paddingVertical:12
  }
});
export default HomeScreen

