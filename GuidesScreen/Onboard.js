import React, { useContext, useState } from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card , useTheme} from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import { AuthContext } from '../AuthContext'
import SwiperButtons from '../UtilComponents/SwiperButtons'
import GuideComponent from '../UtilComponents/GuideComponent'

function Onboard(){

  const theme = useTheme();
  const authContext = useContext(AuthContext)


  return (
    <View style={{flex:1}}>
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
      

    <GuideComponent 
    picture={require('../assets/images/girlthinkingbackground.png')} 
    headerText={'Reshaping learning'}
    bodyText={'Learn how to learn. Face learning in a new light. Structured in a way where progress is noticable!'}
    />
 

 

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Learn and grow'}
    bodyText={'And push yourself to grow and learn. Enjoy learning!'}
    />


    <GuideComponent 
    picture={require('../assets/images/girltakingnotes.png')} 
    headerText={'Learn and grow'}
    bodyText={'And push yourself to grow and learn. Enjoy learning!'}
    />






     



      <View style={styles.slide1}>
      <GuideComponent 
      picture={require('../assets/images/walkingwithoutbackground.png')} 
      headerText={'Learning is about making progress'}
      bodyText={'Learning and growing is one of most fufilling things you can do. Learning is about doing, trying, and making progress.'}
      />
    
    <Button style={{ marginBottom:100, marginHorizontal:32}} onPress={()=>{authContext.setNewUser(false)}}>I'm ready to start my learning adventure</Button>
    </View>


    </Swiper>
    </View>
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
   
  
    flex:1,
  

  },

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

export default Onboard