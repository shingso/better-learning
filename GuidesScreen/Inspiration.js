import React from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'
import SwiperButtons from '../UtilComponents/SwiperButtons'

function Inspiration(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader/>
    <Text style={{fontWeight:'bold', fontSize:16, marginLeft:4}}>Inspiration</Text>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/becomesmarterv1.png')} 
    headerText={'Become Smarter'}
    bodyText={'Learning is a skill that can be developed. The more you study the smarter you will become.'}
    />

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Put in the time and the results will come'}
    bodyText={'Small amounts of progress add up. Day by day progress might seem insignificant, but'}
    />

    <GuideComponent 
    picture={require('../assets/images/success.png')} 
    headerText={'You can go further than you think'}
    bodyText={"With enough time and effort you can solve difficult problems and understand complex concepts."}
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

export default Inspiration