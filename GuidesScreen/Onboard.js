import React, { useContext, useState } from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'


const nextButton = () => {
return(
<View>
<Button appearance={'ghost'}>Next</Button>
</View>
)
}

function Onboard(){

  return (
    <View style={{flex:1}}>
    <Swiper showsButtons={true} nextButton={<Button size={'large'} appearance={'ghost'}>Next</Button>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
      
      <ImageBackground style={{flex:1}}  source={require('../assets/images/backgroundLowV1.png')}>
      <View style={styles.slide1}>
      <Text style={{marginBottom:20, textAlign:'center'}} category='h2'>Welcome!</Text>
      <Text category='p1' style={{textAlign:'center'}}>In fact most people have many misconceptions about learning </Text>
      <Image
        style={{
          width:400,
          height: 350,
          marginVertical:16,
          resizeMode:'contain',
        

        }}
        source={require('../assets/images/girlThinkingHDv1.png')}
      />
      <Text style={{marginBottom:20, textAlign:'center'}} category='s1'>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
      </View>
      </ImageBackground>





      
      <ImageBackground style={{flex:1}}  source={require('../assets/images/backgroundLowV1.png')}>
      <View style={styles.slide1}>
      <Text style={{ textAlign:'center'}} category='h1'>consectetur adipiscing elit</Text>
      
      <Image
        style={{
          width:350,
          height: 350,
          marginBottom:16,
          marginTop:16,
          resizeMode:'contain',
      
        }}
      
        source={require('../assets/images/blogpostv2.png')}
      
      />
      <Text style={{textAlign:'center', marginBottom:20}}>Eget nulla facilisi etiam dignissim diam quis enim lobortis. Tortor dignissim convallis aenean et tortor</Text>
           
      <Text style={{marginBottom:20, textAlign:'center'}} category='s1'>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
      </View>
      </ImageBackground>



      
      <View style={[styles.slide1,{backgroundColor:'#B5E2E2'}]}>
      <Text style={{marginBottom:20, textAlign:'center'}} category='h1'>Tortor dignissim convallis</Text>
      <Text style={{textAlign:'center'}}>Eget nulla facilisi etiam dignissim diam quis enim lobortis. Tortor dignissim convallis aenean et tortor</Text>
      <Image
        style={{
          width:350,
          height: 300,
          marginVertical:32,
          resizeMode:'contain',
      
        }}
      
        source={require('../assets/images/boystudyingv1.png')}
      
      />
           
      <Text style={{marginBottom:20, textAlign:'center'}} category='s1'>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
      </View>



    </Swiper>
    {/* <View style={{flexDirection:'row', justifyContent:'space-between',paddingHorizontal:16, paddingBottom:16}}>
    <Button>Skip</Button>
    <Button>Next</Button>
    </View> */}
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
    flex:1

  



  },

});

export default Onboard