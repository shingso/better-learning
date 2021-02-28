import React, { useContext, useState } from 'react';
import { View , StyleSheet, SafeAreaView,ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';






function Welcome(){

  const navigation = useNavigation();

  return(

    <SafeAreaView style={{flex:1}}>
    <View style={{ flex: 1, padding:20 }}>
    <TouchableOpacity  onPress={()=>navigation.navigate('Login')}>
    <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-end'}}>
    <View style={{marginRight:4, alignItems:'flex-end'}}>
    <Text category='label' style={{}}>Been here before?</Text>
    <Text status='info' category='s2'>Go to Login</Text>
    </View>
    <Icon height={30} width={30} name='arrow-ios-forward-outline' fill={'black'}/>
    </View>
    </TouchableOpacity>
    
  
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text style={{marginTop:20, marginLeft:8}} category='h1'>Learn</Text>
    <Text style={{marginTop:8, marginLeft:8, fontSize:46}} category='h1'>Smarter</Text>
    </View>

    <View style={{flex: 1, justifyContent:'center', marginBottom:36, padding:16}}>
    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    </Text>
    <Button style={{borderRadius:30}} size='large' onPress={() => navigation.navigate('SignUp')}>
    Sign Up
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