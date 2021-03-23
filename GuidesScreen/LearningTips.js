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
    bodyText={'While we sleep, new information is processed in our brains. Make sure to get an adequte amount of sleep.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Make a habit of studying'}
    bodyText={'Build a consistent study schedule. Starting at the same time every day helps us get into studying easier.'}
    />


    {/* <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Pick something that you think is valuable'}
    bodyText={'The more attentive you are and in thought, the better you will learn. Do your best to get rid of distractions.'}
    /> */}

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Apply the knowledge'}
    bodyText={'Find a way to apply what you have learned. Practice problems or projects will help you get better.'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default LearningTips