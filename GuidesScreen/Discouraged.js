import React from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'
import SwiperButtons from '../UtilComponents/SwiperButtons'

function Discouraged(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader/>
    <Text style={{fontWeight:'bold', fontSize:16, marginLeft:4}}>Discouraged</Text>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/girlthinkingbackground.png')} 
    headerText={'Just start and do your best'}
    bodyText={'Try to start everyday. Do what you can. Some days you might study a lot and some days you will be less motivated. Either way progress is progress and everything counts.'}
    />

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Try to start everyday'}
    bodyText={'If you are procrasting, start a study session and work for the timer. Starting is the hardest part'}
    />

    <GuideComponent 
    picture={require('../assets/images/problemsolving.png')} 
    headerText={'Learning new concepts is tough'}
    bodyText={'Everyone struggles. It takes more than one look, one try, to build an understanding of a subject'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/puttingintime.png')} 
    headerText={'Focus on the process and putting in the time'}
    bodyText={'Judge a session based on whether or not you solved a problem or understood a concept. Whether or not you solved the problem or fully understood the concept is unimportant'}
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

export default Discouraged