import React, { useContext, useState } from 'react';
import { View , StyleSheet } from 'react-native';

import { Button, Text ,Icon , Input, Modal, Card } from '@ui-kitten/components';

import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';





function Welcome(){

  const navigation = useNavigation();

  return(
           
    <View style={{ flex: 1, padding:16}}>
    
    <View>
    <Text category='h1'>Welcome</Text>
    </View>
    
    <View style={{flex: 1, justifyContent:'center', marginBottom:36}}>

    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Already have an account?
    </Text>
    <Button  onPress={() => navigation.navigate('Login')}>
    Go to Login
    </Button>


    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Don't have an account?
    </Text>
    <Button appearance={'outline'} onPress={() => navigation.navigate('SignUp')}>
    Sign Up with Email
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