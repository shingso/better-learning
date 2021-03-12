import React, { useContext, useState } from 'react';
import { View , StyleSheet } from 'react-native';
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
    picture={require('../assets/images/comfortablelearningv3.png')} 
    headerText={'Become comfortable with learning'}
    bodyText={'End procrastination when needing to study by building confidence in your ability to learn'}
    bodyText2={'Build confidence in your ability to learn. '}
    />

    <GuideComponent 
    picture={require('../assets/images/learnefficiently.png')} 
    headerText={'Learn more efficiently'}
    bodyText={'Using simple guided study sessions for better retention of information and a overall intuition.'}
    />


    <View style={styles.slide1}>
    <GuideComponent 
    picture={require('../assets/images/becomesmarterv2.png')} 
    headerText={'Work towards being a smarter you'}
    bodyText={'Start developing intelligence by spending time learning. The more time you learn, the smarter you will become!'}
    />

    <Button style={{ marginBottom:100, marginHorizontal:32, borderRadius:30}} onPress={()=>{authContext.setNewUser(false)}}>I'm ready to start learning</Button>
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