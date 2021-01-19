import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { useNavigation } from '@react-navigation/native';





function RecalledNotes({ navigation }){
    
 
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

      <View style={{flex: 1,alignItems:'center', marginTop:60,justifyContent:'center',padding:16}}>
      
      <Image
        style={{width: 650, height: 250, resizeMode:'contain'}}
        source={require('../assets/images/notesv1.png')}
      
      />

      <Text style={{textAlign:'center', marginTop:40}}>Your notes for <Text category='s1'>{title}</Text> will be organized here.</Text>
      <Text style={{textAlign:'center', marginTop:20}}>If you come up with thoughts write it down, typing it out will reinforce the idea in our heads</Text>

     
      </View>
      
    )



 
   
    const renderHeader = () => (
        
      <View style={{marginBottom:12}}>
      <TopHeader title={'Recalled Notes'}/>
      </View>

    );
 
    
 
    
    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes').where('recallNote', '==', true)
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


    
    }

export default RecalledNotes

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
    paddingVertical:32,
   
  },

});