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

     
    
    <View style={styles.container}>
        {/* <Image
          style={{
            flex:3,         
            resizeMode:'contain'
          }}
          source={require('../assets/images/girlthinkingbackground.png')}
        /> */}
     
        <View style={{alignItems:'center',flex:1}}>
        <Text category='h1' >{'Welcome'}</Text>
        <Text category='h2' style={{marginTop:20}}>{'to'}</Text>
        <Text category='h2' style={{marginTop:20}}>{'the'}</Text>
        <Text category='h1' style={{marginTop:20}}>{'Start'}</Text>
        <Text category='h2' style={{marginTop:20}}>{'of'}</Text>
        <Text category='h2' style={{marginTop:20}}>{'a'}</Text>
        <Text category='h1' style={{marginTop:20}}>{'Smarter'}</Text>
        <Text category='h1' style={{marginTop:20}}>{'You'}</Text>
        </View>
    
    </View>
  

    <GuideComponent 
    picture={require('../assets/images/girlthinkingbackground.png')} 
    headerText={'Reshape the way you learn'}
    bodyText={'Discover learning as a meaningful'}
    />
 

 

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Become comfortable with studying'}
    bodyText={'Overcome procrastination. Slowly build consistent studying habits and become more comfortable with learning'}
    />


    <GuideComponent 
    picture={require('../assets/images/girltakingnotes.png')} 
    headerText={'Learn and grow'}
    bodyText={'As you continue in your learning journey, you will continue face more and more complex problems.'}
    />


    <View style={styles.slide1}>
      
    <GuideComponent 
    picture={require('../assets/images/walkingwithoutbackground.png')} 
    headerText={'Work towards becoming the best you'}
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