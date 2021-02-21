import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function LearningTips(){

 
  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>

    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader title='Learning Tips'/>
    </View>
    
    <GlobalSwiper>
   {/*  <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Take care of yourself'}
    bodyText={'External factors that influence our rate of learning. Taking care of our bodies is critical to learning'}
    />
 */}
    <GuideComponent 
    picture={require('../assets/images/wellrested.png')} 
    headerText={'Get good sleep'}
    bodyText={'Our brains process information deeply when we sleep. Getting adequte sleep is curcial to learning and information retention.'}
    />



    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Focus on the process'}
    bodyText={'The more energized you are, the more focused and attentive you will be. The more attentive you are, the better you will learn'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Practice, Practice, Practice'}
    bodyText={'Practicing enforces our thoughts. The more we practice the more deeply engrained the concepts will be.'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default LearningTips