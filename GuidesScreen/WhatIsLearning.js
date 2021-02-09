import React from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'
import SwiperButtons from '../UtilComponents/SwiperButtons'

function WhatIsLearning(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader title={'What is Learning?'}/>
    
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Learning is a constant process'}
    bodyText={'Learning is slowly figuring out concepts. This process occurs over weeks, not days. Inorder to build valuable, Taking ranging from days to months to fully understand something'}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Building on past information'}
    bodyText={'Learning is putting information you already know and building on top of it. '}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Focused, Active, and Engaged'}
    bodyText={'Be focused and constantly in thought while you are learning. Constantly think about how concepts work and relate to each other'}
    />

    

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Building an undestanding'}
    bodyText={'Work on trying to understand how the current concepts fit into the bigger picture. How do the smaller concepts fit together.'}
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

export default WhatIsLearning