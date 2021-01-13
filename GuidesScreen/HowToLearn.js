import React, { useContext, useState } from 'react';
import { View , StyleSheet, Image } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'
import SwiperButtons from '../UtilComponents/SwiperButtons'

function HowToLearn(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4}}>
    <TopHeader title={'How do I Learn'}/>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/studyinggirl.png')} 
    headerText={'Short and sweet'}
    bodyText={'The key to effective learning is short and actively engaged studying. Try to invoke thought inorder to solidify concepts2!'}
    />

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Decide on what you are going to do'}
    bodyText={'Before you start a study session, have an idea of what you want to do .'}
    />

    <GuideComponent 
    picture={require('../assets/images/girltakingnotes.png')} 
    headerText={'Start a study session.'}
    bodyText={' The key to being productive is to make continuous progress, A study sessions is a 25 minute period were you are commited on focusing. Using a timer to keep track of. During this time, engage and actively thinking about what you are reading.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/walkingwithoutbackground.png')} 
    headerText={'Recall'}
    bodyText={'After the study session is over, take some time to think about what you just learned about and write it down.'}
    />

    <GuideComponent 
    picture={require('../assets/images/relaxingbed.png')} 
    headerText={'Take a break'}
    bodyText={'After a study session, take a break. Spend some time unwinding or doing something of leisure'}
    />

    </Swiper>
    </Layout>

    
  )
};


const styles = StyleSheet.create({
  

  nextButtonStyle:{
    marginBottom:12, 
    marginRight:20, 
    borderWidth:1, 
    padding:14, 
    borderRadius:6, 
    paddingHorizontal:22
  },

  prevButtonStyle:{
    marginBottom:12, 
    marginLeft:20, 
    borderWidth:1,
    padding:14, 
    borderRadius:6, 
    paddingHorizontal:22
  }

});

export default HowToLearn