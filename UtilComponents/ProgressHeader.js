import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';


function ProgressHeader(props){
 

    // 0 times within the last two weeks - Motivation message to start
    // 1 times within the last two weeks - 
    // 4 times within the last two weeks - 
    // 7 times in the week? - Your killing it!  

    // depends on how many days have passed in the week 

    // need to set background pictures and text

    return (
       
      <Card>
      <ImageBackground opacity={0.20} resizeMode='cover' source={require('../assets/images/8600.5.png')} style={styles.image}>
      <Text>Hello</Text>
      </ImageBackground>
      </Card>
      
      );

    }

const styles = StyleSheet.create({
  item: {

    marginVertical:8,
  
    
  },
  //contanier that holds everything 
  
  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
  
    margin:-24,
    padding:24
  },
});

export default ProgressHeader

