import React, { useContext, useState } from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, Layout } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'

function WhatIsLearning(){

  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, borderColor:'red', borderWidth:1}}>
    <TopHeader/>
    </View>
    
    <Swiper style={styles.wrapper} loop={false} index={0}>

    <Layout style={styles.slide1}>
    <ImageBackground style={{flex:1, padding:16}}  source={require('../assets/images/backgroundLowV1.png')}>
    <Text style={{marginBottom:12, textAlign:'center'}} category='h2'>Learning is a process</Text>
    <Text category='p1' style={{textAlign:'center'}}>Building on past information inorder to comprehend new information</Text>
    <Image
      style={{
        borderColor:'black',
        borderWidth:1,
        width:250,
        height: 350,
        alignSelf:'center',
        marginVertical:16,
        resizeMode:'contain',
      

      }}
    
      source={require('../assets/images/girlThinkingHDv1.png')}
    
    />
         
    <Text style={{textAlign:'center'}} category='s1'>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
    </ImageBackground>
    </Layout>





    <ImageBackground style={{flex:1}}  source={require('../assets/images/backgroundLowV1.png')}>
    <View style={styles.slide1}>
    <Text style={{marginBottom:12, textAlign:'center'}} category='h2'>Learning is a process</Text>
    <Text category='p1' style={{textAlign:'center'}}>Building on past information inorder to comprehend new information</Text>
    <Image
      style={{
        borderColor:'black',
        borderWidth:1,
        width:250,
        height: 350,
        alignSelf:'center',
        marginVertical:16,
        resizeMode:'contain',
      

      }}
    
      source={require('../assets/images/girlThinkingHDv1.png')}
    
    />
         
    <Text style={{textAlign:'center'}} category='s1'>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
    </View>
    </ImageBackground>






    
    <ImageBackground style={{flex:1}}  source={require('../assets/images/backgroundLowV1.png')}>
    <View style={styles.slide1}>
    <Text style={{ textAlign:'center'}} category='h1'>Learning is NOT memorization</Text>
    
    <Image
      style={{
        width:350,
        height: 350,
        marginBottom:16,
        marginTop:16,
        resizeMode:'contain',
      }}
      source={require('../assets/images/blogpostv2.png')}
    />
    <Text style={{textAlign:'center', marginBottom:20}}>Try and memorize as little as possible when learning!</Text>
    <Text style={{textAlign:'center', marginBottom:20}}>If you have something memorized, you DO NOT understand the underlying concept</Text>
    <Text style={{marginBottom:20, textAlign:'center'}} category='s1'>Instead look towards understanding concepts. Figure out how smaller concepts and think about how they fix into the larger concept</Text>
    </View>
    </ImageBackground>



    
    <View style={[styles.slide1,{backgroundColor:'#B5E2E2'}]}>
    <Text style={{marginBottom:20, textAlign:'center'}} category='h1'>Learning is engaged and active</Text>
    <Text style={{textAlign:'center'}}>Our brains absorb and process information the best when we are fully focused on what is in front of us</Text>
    <Text style={{textAlign:'center'}}>Actively thinking about what we are trying to learn</Text>
    <Image
      style={{
        width:350,
        height: 300,
        marginVertical:32,
        resizeMode:'contain',
      }}
      source={require('../assets/images/boystudyingv1.png')}
    />
    <View>
    <Text style={{textAlign:'center'}} category='s1'>The best way to learn with SHORT but CONCENTRATED periods of time</Text>
    </View>
    </View>



  </Swiper>
  </Layout>
  )
};


const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  slide1: {
    flex: 1,
    justifyContent: 'space-between',
    borderColor:'blue',
    borderWidth:1, 

    
    marginBottom:50

  },

});

export default WhatIsLearning