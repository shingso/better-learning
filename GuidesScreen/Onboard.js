import React, { useContext, useState } from 'react';
import { View , StyleSheet, SafeAreaView } from 'react-native';
import { Button, Text, useTheme} from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function Onboard(){


  const authContext = useContext(AuthContext)

  return (
    
    <View style={{flex:1,paddingVertical:40}}>
    <SafeAreaView style={{flex:1}}>
    <GlobalSwiper>

    <GuideComponent 
    picture={require('../assets/images/reshapev1.png')} 
    headerText={'Reshape the way you learn'}
    bodyText={'Rediscover learning in a process oriented approach that is managable and effective.'}
    />
 
    <GuideComponent 
    picture={require('../assets/images/comfortablestudyv1.png')} 
    headerText={'Become comfortable with learning'}
    bodyText={'Guided study sessions to help you be more comfortable with the process of learning.'}
    bodyText2={'Build confidence in your ability to learn. '}
    />

   {/*  <GuideComponent 
    picture={require('../assets/images/learnefficiently.png')} 
    headerText={'Build practical knowledge'}
    bodyText={'Start learning in a way that builds a deep understanding. Build practical knowledge.'}
    /> */}


    <View style={styles.slide1}>
    <GuideComponent 
    picture={require('../assets/images/becomesmarterv2.png')} 
    headerText={'Learn better'}
    bodyText={"Learn in a way where information is better understood and retained."}
    />

    <Button size='large' style={{ marginBottom:100, marginHorizontal:32, borderRadius:30, elevation:1}} onPress={()=>{authContext.setNewUser(false)}}>Let's start learning</Button>
    </View>


    </GlobalSwiper>
    </SafeAreaView>
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