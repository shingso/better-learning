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
  
    <GuideComponent 
    picture={require('../assets/images/wellrested.png')} 
    headerText={'Get good sleep'}
    bodyText={"While we sleep our brains processes the information that we learned. Getting an adequate amount of sleep every night is crucial to learning."}
    />

    <GuideComponent 
    picture={require('../assets/images/makehabitv2-01.png')} 
    headerText={'Make a habit of studying'}
    bodyText={'Try and study at the same time every day. Bulding a habit will make starting easier and is greatly beneficial to making progress.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/project-01.png')} 
    headerText={"Apply what you've learned"}
    bodyText={'Practicing is the best way to solidify what we have learned. Always look to build a project or find problems to practice on.'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default LearningTips