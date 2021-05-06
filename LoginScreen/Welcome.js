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
    <View style={{ flex: 1, padding:20 }}>
    <View style={{alignItems:'center'}}>
    <Image
        style={{width: 200, height: 170, marginTop:60}}
        source={require('../assets/images/studyseshlogo.png')}
        resizeMode={'contain'}
    />  
    </View>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text style={{marginTop:20, marginLeft:8, fontFamily:'Poppins-Bold', fontSize:32, textAlign:'center', paddingHorizontal:12}}>Welcome to a better way to learn</Text>
    </View>

    <View style={{flex: 1, marginBottom:36, padding:16, }}>
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