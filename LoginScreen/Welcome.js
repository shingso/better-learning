import React from 'react';
import { View , StyleSheet, SafeAreaView, Image } from 'react-native';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { useNavigation,} from '@react-navigation/native';
import GlobalStyle from '../constants'



function Welcome(){

  const navigation = useNavigation();
  const theme = useTheme()
  return(

    <SafeAreaView style={{flex:1}}>
    <View style={{ flex: 1, padding:20, justifyContent:'center',  }}>
    <View style={{alignItems:'center'}}>
    <Image
        style={{width: 200, height: 170, marginBottom:40}}
        source={require('../assets/images/studyseshlogo.png')}
        resizeMode={'contain'}
    />  
    </View>
    <View style={{ justifyContent:'center', alignItems:'center', marginBottom:20}}>
    <Text style={{marginTop:20, marginLeft:8, fontFamily:'Poppins-Bold', fontSize:32, textAlign:'center', paddingHorizontal:12, fontWeight:'800'}}>Welcome to a better way to learn</Text>
    </View>

    <View style={{ marginBottom:36, padding:16, }}>
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



export default Welcome