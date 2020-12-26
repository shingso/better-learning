import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native';
import { Text, Button, Layout } from '@ui-kitten/components';








function StudyFinished(){
   
    const navigation = useNavigation()
    


    return (

      <Layout style={{flex:1}}>
      <SafeAreaView style={{flex:1}}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text category='h5' style={{marginBottom:20}}>Study Session Complete!</Text>
      <Text category='s1'>time for a break</Text>

      <Button onPress={()=>{navigation.dispatch(StackActions.popToTop())}}>Completed</Button>
      </View>
      </SafeAreaView>
      </Layout>

    )
      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({
  item: {

    marginBottom:8,
  
    
  },
  //contanier that holds everything 
  contentContainer: {

    paddingHorizontal: 16,

  },

  listItem:{
    lineHeight:24,
    textAlign:'center'
  },
  
  container:{
 
    flex:1
  },

  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
  
    margin:-24,
    padding:24
  },
});

export default StudyFinished

