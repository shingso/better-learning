import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Divider } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'

const EditIcon = (props) => (
    <Icon {...props} name='edit-outline'/>
  );

  const PlayIcon = (props) => (
    <Icon {...props}  name='chevron-right-outline'/>
  );
  

  const BookIcon = (props) => (
    <Icon {...props} name='book-outline'/>
  );

function HomeScreen(){
    const user = useContext(AuthContext)

    const userID = user.uid

    const navigation = useNavigation();

    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    
    
    const renderListFooter = () => (
      <View style={{alignItems:'flex-start'}}> 
          <Button appearance='outline' style={{marginVertical:12}} onPress={()=>navigation.navigate('AddSubject')}>
          ADD SUBJECT
          </Button>
        
      </View>
  );
  
  //<Text category='h1'>Home</Text>
  const renderHeader = () => (
    
    <View style={{marginBottom:16}}>

    <Button appearance='outline' style={{marginVertical:12}} onPress={()=>navigation.navigate('TipsPage')}>
      TIPS
    </Button>
    </View>
  );

    const renderItem = (info) => (
      
      <Card
        style={styles.item}
        disabled={true}
       >

      <View style={{ justifyContent:'space-between' }}>
      <View>
      <Text category='s1'>
        {info.item.title} 
      </Text>
     
      </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:40}}>
        <Button accessoryLeft={BookIcon} style={{marginRight:16}} appearance={'outline'} onPress={()=>navigation.navigate('NotesFocused', {id:info.item.id, title:info.item.title})}/>
        <View style={{flexDirection:'row'}}>
        <Button accessoryLeft={EditIcon} style={{marginRight:16}} appearance={'outline'} onPress={()=>navigation.navigate('AddNotes', {id:info.item.id, mode:'ADD'})}/>
        <Button accessoryLeft={PlayIcon}  onPress={()=>navigation.navigate('SetTimer', {id:info.item.id})}/>
        </View>
        </View>
        </View>
      </Card>
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
       
    <SafeAreaView style={{flex: 1}}>
    <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={todos}
        renderItem={renderItem}
        ListFooterComponent={renderListFooter}
        ListHeaderComponent={renderHeader}
        />

    </SafeAreaView>
      
      
    );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({
  item: {

    marginVertical:8,
    
  },
  //contanier that holds everything 
  contentContainer: {

    paddingHorizontal: 20,
    paddingVertical: 12,
   
  },
  
  container:{
  
  }
});
export default HomeScreen

