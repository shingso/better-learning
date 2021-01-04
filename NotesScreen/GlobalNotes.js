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


function GlobalNotes({ navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid

    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    
    const renderItem = (info) => (
      
      <View style={styles.item}>
      <Text category='label' style={{marginBottom:8, fontSize:10}} appearance='hint'>{format(new Date(info.item.timeStamp.toDate()), 'MMM d yyyy')}</Text>
      {info.item.textTheme != null && <Text category='s1' style={{fontWeight:'bold', marginBottom:8}}>{info.item.textTheme}</Text>}
      <Text style={{lineHeight:22}} >{info.item.text}</Text>
      </View>
      

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
        
      <View style={{marginBottom:12, flexDirection:'row', alignItems:'center'}}>
      <TopHeader/>
      <Text category='s1'>All Notes</Text>
      {/*  <Button accessoryLeft={EditIcon}  size='small'  onPress={()=>navigation.navigate('AddNotes')}/> */}
      </View>

    );
 
    
 
    
    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes')
        return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
          if(!querySnapshot.metadata.hasPendingWrites){
          const list = [];
          querySnapshot.forEach(doc => {


            const { text, timeStamp, textTheme } = doc.data();

            list.push({
              id: doc.id,
              text,
              timeStamp,
              textTheme,
            
            });
          });
      
          setTodos(list);
    
          if (loading) {
            setLoading(false);
          }

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
         ListEmptyComponent={renderEmpty}
         ListHeaderComponent={renderHeader}
         />
       </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default GlobalNotes

const styles = StyleSheet.create({
  
  

  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  contentContainer: {
    marginVertical:12,
    marginHorizontal:20,
    paddingBottom:100,
   
    
  },

  container:{
  
  },

 
  
  item: {
    paddingVertical:32,

   
  },

});