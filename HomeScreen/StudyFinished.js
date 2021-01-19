import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground, Image } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native';
import { Text, Button, Layout, useTheme } from '@ui-kitten/components';
import StudyProgressIndicator from '../UtilComponents/StudyProgressIndicator'







function StudyFinished(){
   
    const navigation = useNavigation()
    const theme = useTheme()


    return (

      <Layout style={{flex:1}}>
      <SafeAreaView style={{flex:1}}>
     
      <StudyProgressIndicator currentStep={4}/>
  

    <View style={{flex:1, marginVertical:40, alignItems:'center', justifyContent:'center',paddingHorizontal:32}}>
    <Image
          style={{
            width:420,
            height:230,
            alignSelf:'center',
            resizeMode:'contain',
            marginBottom:48
          }}
          source={require('../assets/images/studyfinishedv1.png')}
        />
    
    
    

    <View>
    <Text style={{textAlign:'center'}}><Text category='h6' style={{fontWeight:'bold'}}>Study Session Complete!</Text></Text>
    <Text style={{marginTop:20,letterSpacing:0.2, lineHeight:30, fontSize:16,color:theme['color-basic-600'], textAlign:'center'}}>Its time for a break </Text>
    </View>
    </View>
      <Button style={{marginBottom:60, marginHorizontal:32}} onPress={()=>{navigation.dispatch(StackActions.popToTop())}}>Complete</Button>
      
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

