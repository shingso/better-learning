import React, { useContext, useState } from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card , useTheme} from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import { AuthContext } from '../AuthContext'


function Onboard(){

  const theme = useTheme();
  const authContext = useContext(AuthContext)


  return (
    <View style={{flex:1}}>
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<Text status='primary' style={[styles.nextButtonStyle,{borderColor:theme['color-primary-default']}]}>Next</Text>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
      
   
      <View style={styles.slide1}>
  
      <View style={{ flex:1 }}>
      <Image
        style={{

          width:500,
          height: 420,
          marginTop:60,
          resizeMode:'contain',

        }}
        source={require('../assets/images/girlthinkingbackground.png')}
      />
      </View>

      <View style={{flex:1, justifyContent:'flex-end'}}>
      <Text category='h4' style={{marginBottom:24,textAlign:'center', fontSize:24}}>Reshaping learning</Text>
      <Text style={{marginBottom:80, textAlign:'center', fontSize:15}} category='s1'>Learn how to learn. Face learning in a new light. Structured in a way where progress is noticable.</Text>
      </View>
      </View>






      <View style={styles.slide1}>
      <View style={{ flex:1 }}>
      <Image
        style={{

          width:400,
          height: 350,
          marginTop:60,
          resizeMode:'contain',

        }}
        source={require('../assets/images/boybutterfly.png')}
      />
      </View>

      <View style={{flex:1, justifyContent:'flex-end'}}>
      <Text category='h4' style={{marginBottom:24,textAlign:'center', fontSize:24}}>Learn and grow</Text>
      <Text style={{marginBottom:80, textAlign:'center', fontSize:15}} category='s1'>And push yourself to grow and learn. Enjoy learning!</Text>
      </View>
      </View>


      <View style={styles.slide1}>
      <View style={{ flex:1 }}>
      <Image
        style={{

          width:400,
          height: 350,
          marginTop:60,
          resizeMode:'contain',

        }}
        source={require('../assets/images/girltakingnotes.png')}
      />
      </View>

      <View style={{flex:1, justifyContent:'flex-end'}}>
      <Text category='h4' style={{marginBottom:24,textAlign:'center', fontSize:24}}></Text>
      <Text style={{marginBottom:80, textAlign:'center', fontSize:15}} category='s1'>And push yourself to grow and learn. Enjoy learning!</Text>
      </View>
      </View>


      <View style={styles.slide1}>
  
      <View style={{ flex:1 }}>
      <Image
       style={{
        width:400,
        height: 350,
        marginTop:72,
        resizeMode:'contain',

        }}
      source={require('../assets/images/walkingwithoutbackground.png')}
      />
      </View>

    <View style={{flex:1, justifyContent:'flex-end', marginBottom:64}}>
    <Text category='h4' style={{marginBottom:24,textAlign:'center', fontSize:24}}>Learning is about making progress</Text>
    <Text style={{textAlign:'center', lineHeight: 24 ,fontSize:15, marginHorizontal:4}} category='s1'>Learning and growing is one of most fufilling things you can do. Learning is about doing, trying, and making progress.</Text>
    <Button style={{marginTop:32}} onPress={()=>{authContext.setNewUser(false)}}>I'm ready to start my learning adventure</Button>
    </View>
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
   
    paddingBottom:32,
    paddingHorizontal:20,
    paddingTop:24,
    alignItems:'center',
    flex:1,
    justifyContent:'center'

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