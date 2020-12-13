import React, { useContext, useState } from 'react';
import { View , StyleSheet, Image } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'

function LearningTips(){

  return (
     
    <Swiper style={styles.wrapper} loop={false} index={0}>
      
      <View style={styles.slide1}>
      <Text style={{marginBottom:20}} category='h1'>Learning Tips</Text>

      <Text>Learning is about putting time into understanding a subject</Text>
      <Image
        style={{width: 350,
          height: 300}}
        source={require('../assets/images/studying.png')}
      
      />
           
      <Text style={{marginBottom:20, paddingHorizontal:16}} category='s1'>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
      </View>
      
      
      <View style={styles.slide1}>
      <Text style={{marginBottom:20}} category='h1'>Focus on Studying</Text>
      <Text style={{paddingHorizontal:16}}>The most important thing to studying is to be engaged with the material</Text>
      <Text style={{paddingHorizontal:16}}>Dont worry about how fast or slow you are studying, whether you fully understand the material or not</Text>
      <Text style={{paddingHorizontal:16}}>Just make sure that you are making progress when you are studying</Text>
      <Image
        style={{width: 650,
          height: 300}}
        source={require('../assets/images/studying.png')}
      
      />
           
      <Text style={{marginBottom:20, paddingHorizontal:16}} category='s1'>When the timer is running try your best to stay focused on studying!</Text>
      </View>

      <View style={styles.slide1}>
      <Text style={{marginBottom:20}} category='h1'>Recall</Text>
      <Text style={{paddingHorizontal:16}}>The final step to a study session is to recall what you have learned.</Text>
      <Text style={{paddingHorizontal:16}}>Take some time and think about what you have learned and write it out</Text>
      <Text style={{paddingHorizontal:16}}>During recall you should not be refering to any material and write out only what you remember</Text>
      <Image
        style={{width: 300,
          height: 300}}
        source={require('../assets/images/studying.png')}
      
      />
           
      <Text style={{marginBottom:20, paddingHorizontal:16}} category='s1'>Recalling helps our brains process the information</Text>
      </View>
    </Swiper>
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
    flex: 1,
    justifyContent: 'space-between',

    padding:16,
    
    marginVertical:36

  },

});

export default LearningTips