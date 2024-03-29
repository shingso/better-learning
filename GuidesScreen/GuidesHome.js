import React, { useState, useEffect, useContext } from 'react';
import {  View, SafeAreaView, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions }  from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, useTheme, Layout } from '@ui-kitten/components';
import IOSShadowView from '../UtilComponents/IOSShadowView'



function GuidesHome(){
 
  const theme = useTheme()

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width

  

    const topics = [{title:'Learning better', path:'HowToLearn', bodyText:'A simple yet effective way to learn.', imagePath:require('../assets/images/betterlearningv1-01.png')},
     {title:'How should I be learning?', path:'WhatIsLearning', bodyText:'Start building an understanding.', imagePath:require('../assets/images/womenthinking.png')},
     {title:'How often should I study?', path:'HowOften', bodyText:'Find out how often you should be studying' , imagePath:require('../assets/images/howoftenv1-01.png')},
     {title:'How you can learn quicker!', path:'LearningTips', bodyText:'Tips on learning better outside of studying', imagePath:require('../assets/images/learnquickerv3-01.png')},
     {title: "Can't get into studying?", path:'Discouraged', bodyText:'Procrastination issues or discouraged?', imagePath:require('../assets/images/discouraged-01.png')},
   
    ]

    const renderItem = (info) => (
      <IOSShadowView>
      <Card style={styles.item} onPress={()=>navigation.navigate(info.item.path)}>

      <Image
          style={{
            height:120,
            width:screenWidth,
            marginBottom:28,
            marginTop:-16,
            resizeMode:'cover',
            
          }}
  
          source={info.item.imagePath}
        />
     
      <Text category='h6' style={{marginBottom:16, textAlign:'center' }}>{info.item.title}</Text>
      <Text category='p1' style={{marginBottom:20, textAlign:'center', letterSpacing:0.2, color:theme['color-basic-700']}}>{info.item.bodyText}</Text>
    
      </Card>
      </IOSShadowView>
    );



  

    return (
       

      <SafeAreaView style={{flex: 1}}>
      <List
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={topics}
        renderItem={renderItem}
      />
      </SafeAreaView>
      );


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
      marginVertical:6,
      alignItems:'center',
      borderWidth:0,
      borderRadius:10,
      elevation:1

      
    
    },
  });
