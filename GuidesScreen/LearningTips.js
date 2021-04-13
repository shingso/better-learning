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
    bodyText={'While we sleep information is processed in our brains. Get an adequte amount of sleep every night.'}
    />

    <GuideComponent 
    picture={require('../assets/images/makehabitv2-01.png')} 
    headerText={'Make a habit of studying'}
    bodyText={'Build a consistent study schedule. Starting at the same time every day helps us get into studying easier.'}
    />


    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Revisit the basics'}
    bodyText={'When we go over something we often catch something we didnt before. Getting something explained in a different way'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/project-01.png')} 
    headerText={'Apply the knowledge'}
    bodyText={'Find a way to apply what you have learned. Look to build a project or find problems to practice.'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default LearningTips