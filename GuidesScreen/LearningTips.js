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
    bodyText={'While we sleep our brains processes the information that we learn. Aim to get an adequte amount of sleep every night.'}
    />

    <GuideComponent 
    picture={require('../assets/images/makehabitv2-01.png')} 
    headerText={'Make a habit of studying'}
    bodyText={'Try and study at the same time everyday. Doing so will make it easier to start studying.'}
    />


    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Revisit past information'}
    bodyText={'Reviewing explained in a different way We often. When we go over something we often catch something we didnt before. '}
    />

    
    <GuideComponent 
    picture={require('../assets/images/project-01.png')} 
    headerText={'Apply what you learn'}
    bodyText={'Build a project or find problems to practice. Practicing is the best way to solidify what we have learned.'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default LearningTips