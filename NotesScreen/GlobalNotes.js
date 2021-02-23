import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'


function GlobalNotes(){
    
 
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
          style={{
            height:120,
            width:400,
            marginBottom:28,
            marginTop:-16,
 
          }}
  
          source={require('../assets/images/yournotesv1orange.png')}
        />
    <View style={{alignItems:'center'}}>
    <Text category='h6'>Your Notes</Text>
    <Text style={{marginTop:12, marginBottom:24,letterSpacing:0.2}}>A collection of your thoughts</Text>
    </View>
    </View>
      
    )




    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes').where('recalled', '==', false).orderBy("timeStamp", 'desc')
        return ref.onSnapshot(querySnapshot => {
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
      <TopHeader title='All Notes'/>
      <List
         showsVerticalScrollIndicator={false}
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
         data={todos}
         renderItem={renderItem}
         ListEmptyComponent={renderEmpty}
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
    
    paddingHorizontal:24,
    paddingBottom:100,
   
    
  },

  container:{
  
  },

 
  
  item: {
    paddingVertical:32,

   
  },

});