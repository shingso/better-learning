import React, { useState, useEffect, useContext } from 'react';
import {  View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { Card, List, Text, Button, Icon } from '@ui-kitten/components';



function GuidesHome(){
 
 

    const navigation = useNavigation();
   
    const navigateSettings = () => {
      navigation.navigate('SettingsOptions');
  };
    
  const SettingsIcon = (props) => (
    <Icon {...props} width='25' height='25' name='settings-outline' />
  );
  
   
  const renderHeader = () => (
      
    <View style={{marginBottom:20, flexDirection:'row', justifyContent:'space-between'}}>
    <Text category='h1'>Tips</Text>
    <Button appearance='outline' accessoryRight={SettingsIcon} onPress={navigateSettings}></Button>
    </View>
  );
    
    const todos = [{title:'How do I Learn?', path:'HowToLearn', bodyText:'Learn how to learn'},
     {title:'What is Learning?', path:'LearningTips', bodyText:'The basics of learning'},
     {title:'Im just not getting it...', path:'LearningTips', bodyText:'Procrastination issues or discouraged?'},
     {title:'How you can learn quicker!', path:'LearningTips', bodyText:'Tips on learning'},
     {title:'Some inspiration!', path:'LearningTips', bodyText:'The more often you study the smarter you get!'}
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
