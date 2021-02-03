import React from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'
import SwiperButtons from '../UtilComponents/SwiperButtons'


function HowOften(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4}}>
    <TopHeader title='How often should I study?'/>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/girlthinkingbackground.png')} 
    headerText={'Do what is sustainable'}
    bodyText={'Build consistent studying habits. Aim to study everyday. This means doing what you think you can do over a period of a week.'}
    />

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Avoid burnout'}
    bodyText={'Do not push yourself to the point of exhaustion everyday. The more managable to set up your study goals, the more likely you will stick with it for the long term'}
    />

    <GuideComponent 
    picture={require('../assets/images/girltakingnotes.png')} 
    headerText={'Once per day is a good starting goal'}
    bodyText={'Try to study once per day. If you can manage one study session per day, you will make extradionary amounts of progress'}
    />

    <GuideComponent 
    picture={require('../assets/images/walkingwithoutbackground.png')} 
    headerText={'Slowly ramp up your study session'}
    bodyText={'When you get into the rhythm of studying consistently, you can add more study sessions.'}
    //Lot in one day is not conductive to building good study habits. The more that you do in a day the more tired and difficult working the other days will bve
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