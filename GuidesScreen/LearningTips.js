import React from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function LearningTips(){

 
  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>

    <TopHeader title='Learning Tips'/>
  
    
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
    bodyText={'Our brains processes new information when we sleep. Getting adequte sleep is crucial to learning and information retention.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Make a habit of studying'}
    bodyText={'Study at the same time and in the same place. By having a consistent scheduele starting will become easier.'}
    />


    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Tune your attention'}
    bodyText={'The more attentive you are and in thought, the better you will learn. Do your best to get rid of distractions.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Practice, Practice, Practice'}
    bodyText={'The more we practice the more deeply engrained the concepts will be. Practicing shows us where we have gaps in our information.'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default LearningTips