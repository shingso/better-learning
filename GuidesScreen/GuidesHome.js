import React, { useState, useEffect, useContext } from 'react';
import {  View, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'

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
      
    <View style={{marginBottom:12, flexDirection:'row', justifyContent:'space-between'}}>
    <Text category='h1'></Text>
    <Button size='small' accessoryRight={SettingsIcon} onPress={navigateSettings}></Button>
    </View>
  );
    
    const todos = [{title:'How do I Learn?', path:'HowToLearn', bodyText:'Learn how to Learn!', imagePath:require('../assets/images/teaching.png')},
     {title:'What is Learning?', path:'LearningTips', bodyText:'The basics of learning', imagePath:require('../assets/images/studying.png')},
     {title:'How often should I study?', path:'LearningTips', bodyText:'Find out how often you should be studying' , imagePath:require('../assets/images/calendar.png')},
     {title:'Im just not getting it...', path:'LearningTips', bodyText:'Procrastination issues or discouraged?', imagePath:require('../assets/images/discouraged.png')},
     {title:'How you can learn quicker!', path:'LearningTips', bodyText:'Tips on learning', imagePath:require('../assets/images/progress.png')},
     {title:'Some inspiration!', path:'LearningTips', bodyText:'The more often you study the smarter you get!', imagePath:require('../assets/images/progress.png')}
    ]

    const renderItem = (info) => (
    //'../assets/images/studying.png'
    //
      
      <Card style={styles.item}
       onPress={()=>navigation.navigate('HowToLearn')}
      >
      <ImageBackground opacity={0.20} resizeMode='cover' width={500} source={info.item.imagePath} style={styles.image}>
      <View style={{justifyContent:'space-between'}}>
      <Text category='s1' style={{marginBottom:12}}>{info.item.title}</Text>
      <Text>{info.item.bodyText}</Text>
      </View>
      </ImageBackground>

    
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
    image: {
      flex: 1,
      resizeMode: "center",
      justifyContent: "flex-end",
    
      margin:-24,
      padding:18
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
