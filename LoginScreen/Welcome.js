import React, { useContext, useState } from 'react';
import { View , StyleSheet, SafeAreaView,ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import GlobalStyle from '../constants'





function Welcome(){

  const navigation = useNavigation();
  const theme = useTheme()
  return(

    <SafeAreaView style={{flex:1}}>
    <View style={{ flex: 1, padding:20 }}>
    
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text style={{marginTop:20, marginLeft:8,  fontFamily:'Poppins-Bold', fontSize:46}}>Learn</Text>
    <Text style={{marginTop:8, marginLeft:8, fontSize:46, fontFamily:'Poppins-Bold'}} >Better</Text>
    </View>

    <View style={{flex: 1, justifyContent:'center', marginBottom:36, padding:16}}>
    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    </Text>
    <Button style={{borderRadius:30, ...GlobalStyle.ButtonShadow}} size='large' onPress={() => navigation.navigate('SignUp')}>
    Sign Up
    </Button>

    <Button style={{borderRadius:30, ...GlobalStyle.ButtonShadow, marginTop:32}} status='info' size='large' onPress={() => navigation.navigate('Login')}>
    Go To Login
    </Button>
    
    
    </View>
    </View>
    </SafeAreaView>

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