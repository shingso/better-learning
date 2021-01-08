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
    <TopHeader/>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/girlthinkingbackground.png')} 
    headerText={'Short and sweet'}
    bodyText={'The key to learning is short but focused and engaged studying!'}
    />

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Find something to Learn.'}
    bodyText={'Decide on what you are going to do'}
    />

    <GuideComponent 
    picture={require('../assets/images/girltakingnotes.png')} 
    headerText={'Start a study session.'}
    bodyText={'A study sessions is a 25 minute period where you commit to being focused on the task at hand. During this time, engage and actively thinking about what you are reading.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/walkingwithoutbackground.png')} 
    headerText={'Recall'}
    bodyText={'The last step to a study session is to recall what you have learned about. Take some time to think about what you learned about and write it down. During recall do NOT look at any material'}
    />

    <GuideComponent 
    picture={require('../assets/images/relaxingbed.png')} 
    headerText={'Take a break'}
    bodyText={'When your done studying take a break! Do something you enjoy. Breaks are more important than you think and if you want to push yourself more. Take a break!'}
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