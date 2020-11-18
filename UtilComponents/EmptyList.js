import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';



function EmptyList(props){

  
    return (
       

       

      <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
       <Text>{props.message}</Text>
       </View>
      
      
      );


    }

export default EmptyList

const styles = StyleSheet.create({
  contentContainer: {
  
  },
  container: {
    
  },
  
  item: {
    marginVertical:4
  },

});