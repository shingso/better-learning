import React, { useState, useEffect, useContext } from 'react';
import {  View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { Card, List, Text, Button, Icon } from '@ui-kitten/components';



 
const renderHeader = () => (
    
  <View style={{marginBottom:20}}>
  <Text category='h1'>Guides</Text>
  </View>
);
  
function GuidesHome(){
 
 

    const navigation = useNavigation();


    const todos = [{title:'Lorem ipsum dolor sit amet', path:'HowToLearn', bodyText:'empor incididunt ut labore et dolore magna aliqua'},
     {title:'test', path:'LearningTips', bodyText:'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es'}
    ]

    const renderItem = (info) => (
    
      
      <Card style={styles.item}
       onPress={()=>navigation.navigate('HowToLearn')}
      >
        
      <View style={{justifyContent:'space-between'}}>
      <Text category='s1' style={{marginBottom:12}}>{info.item.title}</Text>
      <Text>{info.item.bodyText}</Text>
   
      </View>
      </Card>

    );



  

    return (
       

        <SafeAreaView style={{flex: 1}}>
     
        <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={todos}
        renderItem={renderItem}

        ListHeaderComponent={renderHeader}
      
        />

      </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default GuidesHome


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
