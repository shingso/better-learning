import React from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'

function HowOften(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4}}>
    <TopHeader/>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<Text status='primary' style={[styles.nextButtonStyle,{borderColor:theme['color-primary-default']}]}>Next</Text>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/girlthinkingbackground.png')} 
    headerText={'Do what is sustainable'}
    bodyText={'Learning is a '}
    />

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Avoid burnout'}
    bodyText={'Decide on what you are going to do'}
    />

    <GuideComponent 
    picture={require('../assets/images/girltakingnotes.png')} 
    headerText={'Once per day'}
    bodyText={'Try to study once per day. '}
    />

    
    <GuideComponent 
    picture={require('../assets/images/walkingwithoutbackground.png')} 
    headerText={'Use your own judgement'}
    bodyText={'The last step to a study session is to recall what you have learned about. Take some time to think about what you learned about and write it down. During recall do NOT look at any material'}
    />

  
    </Swiper>
    </Layout>)
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
  },

});

export default HowOften