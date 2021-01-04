import React from 'react';
import { View , StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'

function LearningTips(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader/>
    <Text style={{fontWeight:'bold', fontSize:16, marginLeft:4}}>Learning Tips</Text>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<Text status='primary' style={[styles.nextButtonStyle,{borderColor:theme['color-primary-default']}]}>Next</Text>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/girlthinkingbackground.png')} 
    headerText={'Building on past information'}
    bodyText={'Learning is about taking information you already know and building on top of it'}
    />

    <GuideComponent 
    picture={require('../assets/images/boybutterfly.png')} 
    headerText={'Focused and active'}
    bodyText={'Decide on what you are going to do'}
    />

    <GuideComponent 
    picture={require('../assets/images/girltakingnotes.png')} 
    headerText={'Learning is a process'}
    bodyText={'A study sessions is a 25 minute period where you commit to being focused on the task at hand. During this time, engage and actively thinking about what you are reading.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/walkingwithoutbackground.png')} 
    headerText={'Learning is NOT memorization'}
    bodyText={'The last step to a study session is to recall what you have learned about. Take some time to think about what you learned about and write it down. During recall do NOT look at any material'}
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

export default LearningTips