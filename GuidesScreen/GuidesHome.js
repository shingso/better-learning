import React, { useState, useEffect, useContext } from 'react';
import {  View, SafeAreaView, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions }  from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, useTheme } from '@ui-kitten/components';



function GuidesHome(){
 
  const theme = useTheme()

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width

  

    const topics = [{title:'What is a study session?', path:'HowToLearn', bodyText:'Learn how to learn effectively!', imagePath:require('../assets/images/howdoilearnbackground.png')},
     {title:'What Is Learning?', path:'WhatIsLearning', bodyText:'Reshape the way you think about learning', imagePath:require('../assets/images/womenthinking.png')},
     {title:'How often should I study?', path:'HowOften', bodyText:'Find out how often you should be studying' , imagePath:require('../assets/images/calendarmark.png')},
     {title:'Im just not getting it...', path:'Discouraged', bodyText:'Procrastination issues or discouraged?', imagePath:require('../assets/images/discouragedbackground.png')},
     {title:'How you can learn quicker!', path:'LearningTips', bodyText:'Tips on learning better outside of studying', imagePath:require('../assets/images/makingprogressbackground.png')},
     {title:'Some inspiration!', path:'Inspiration', bodyText:'The more often you study the smarter you get!', imagePath:require('../assets/images/inspirationgroup.png')}
    ]

    const renderItem = (info) => (
    
      <Card style={styles.item} onPress={()=>navigation.navigate(info.item.path)}>

      <Image
          style={{
            height:100,
            width:screenWidth,
            marginBottom:28,
            marginTop:-16,
           
          }}
  
          source={info.item.imagePath}
        />
     
      <Text category='h6' style={{marginBottom:12, textAlign:'center' }}>{info.item.title}</Text>
      <Text category='p1' style={{marginBottom:16, textAlign:'center', letterSpacing:0.2, color:theme['text-hint-color']}}>{info.item.bodyText}</Text>
    
      </Card>

    );



  

    return (
       

        <SafeAreaView style={{flex: 1}}>
     
        <List
   
        contentContainerStyle={styles.contentContainer}
        data={topics}
        renderItem={renderItem}

        />

      </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default GuidesHome


const styles = StyleSheet.create({
    
    image: {
      flex: 1,
      marginTop:-24,
      marginHorizontal:-24,
      padding:18,
      paddingVertical:24,
      height:80
    },


    contentContainer: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      paddingBottom:32,
 
    },

    item: {
      marginVertical:8,
      alignItems:'center',
      borderWidth:0.5
      
    
    },
  });
