import React, { useContext, useState } from 'react';
import { View , StyleSheet } from 'react-native';
import { Button, Text, useTheme} from '@ui-kitten/components';
import Swiper from 'react-native-swiper'
import { AuthContext } from '../AuthContext'
import SwiperButtons from '../UtilComponents/SwiperButtons'
import GuideComponent from '../UtilComponents/GuideComponent'

function Onboard(){

  const theme = useTheme();
  const authContext = useContext(AuthContext)


  return (
    <View style={{flex:1,paddingVertical:40}}>
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>

    <GuideComponent 
    picture={require('../assets/images/reshapev1.png')} 
    headerText={'Reshape the way you learn'}
    bodyText={'Discover learning as the process of putting small pieces of information to build an undestanding'}
    />
 
    <GuideComponent 
    picture={require('../assets/images/comfortablelearningv3.png')} 
    headerText={'Become comfortable with learning'}
    bodyText={'Build consistent studying habits and become more comfortable with learning. As you study youll become more comfortable with studying'}
    />

    <GuideComponent 
    picture={require('../assets/images/learnefficiently.png')} 
    headerText={'Learn efficiently'}
    bodyText={'Learn more in less time. Spend your study sessions better. Focus better. Retain more information, understand, learn. Retain information better '}
    />


    <View style={styles.slide1}>
    <GuideComponent 
    picture={require('../assets/images/makingprogressbackground.png')} 
    headerText={'Work towards becoming a smarter you'}
    bodyText={'Learning is a process. '}
    />

    <Button style={{ marginBottom:100, marginHorizontal:32, borderRadius:30}} onPress={()=>{authContext.setNewUser(false)}}>I'm ready to start my learning adventure</Button>
    </View>


    </Swiper>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    
    paddingBottom:32,
    paddingHorizontal:20,
    paddingTop:80,
    alignItems:'center',
    flex:1,
    justifyContent:'center',
    paddingBottom:80
    
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