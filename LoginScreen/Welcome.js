import React, { useContext, useState } from 'react';
import { View , StyleSheet, ImageBackground } from 'react-native';

import { Button, Text ,Icon , Input, Modal, Card } from '@ui-kitten/components';

import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';





function Welcome(){

  const navigation = useNavigation();

  return(
           
    <View style={{ flex: 1 }}>
  
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

    <Text style={{marginTop:20, marginLeft:8}} category='h1'>Learn</Text>

    <Text style={{marginTop:8, marginLeft:8, fontSize:46}} category='h1'>Smarter</Text>
    </View>

    <View style={{flex: 1, justifyContent:'center', marginBottom:36, padding:16}}>

 
    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Don't have an account?
    </Text>
    <Button style={{marginBottom:40, borderRadius:30}} size='large' onPress={() => navigation.navigate('SignUp')}>
    Sign Up
    </Button>



    <Text category='label' style={{alignSelf:'center'}}> 
    Already have an account?
    </Text>
    <Button appearance='ghost' onPress={() => navigation.navigate('Login')}>
    Go to Login
    </Button>
    
    </View>
    
    </View>

    )
};


const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Welcome