import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import GuideComponent from '../UtilComponents/GuideComponent'
import SwiperButtons from '../UtilComponents/SwiperButtons'

function LearningTips(){

  const theme = useTheme();
  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader/>
    <Text style={{fontWeight:'bold', fontSize:16, marginLeft:4}}>Learning Tips</Text>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<SwiperButtons/>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Take care of yourself'}
    bodyText={'External factors that influence our rate of learning. Taking care of our bodies is critical to learning'}
    />

    <GuideComponent 
    picture={require('../assets/images/wellrested.png')} 
    headerText={'Get good sleep'}
    bodyText={'Our brains process information deeply when we sleep. Getting adequte sleep is nessecary when trying to learn'}
    />



    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Know that you can learn'}
    bodyText={'The more energized you are, the more focused and attentive you will be. The more attentive you are, the better you will learn'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Practice, Practice, Practice'}
    bodyText={'Practicing enforces our thoughts. The more we practice the more deeply engrained the concepts will be.'}
    />

   

    </Swiper>
    </Layout>)
};


const styles = StyleSheet.create({
  nextButtonStyle:{
    marginBottom:14, 
    marginRight:20, 
    paddingVertical:14, 
    borderRadius:6, 
    paddingHorizontal:22
  },

  prevButtonStyle:{
    marginBottom:14, 
    marginLeft:20, 
    paddingVertical:14, 
    borderRadius:6, 
    paddingHorizontal:22
  },

});

export default LearningTips