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
    <TopHeader title={'What is a study session?'}/>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
  

    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Time spent toward learning'}
    bodyText={'The most important aspect in understanding and learning anything is putting in the time. '}
    />
    
    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Study Time'}
    bodyText={'When you start the study session a timer will start. This time is meant for study.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Recall'}
    bodyText={'To wrap up a study session, think about what you have studied and type it out. Everything that you type should be from memory.'}
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'When your done recalling, take a break. Breaks are important in learning'}
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