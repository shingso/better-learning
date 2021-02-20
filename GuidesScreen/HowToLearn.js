import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function HowToLearn(){


  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4}}>
    <TopHeader title={'How should I be learning?'}/>
    </View>
    
    <GlobalSwiper>

    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Short and sweet'}
    bodyText={'In order to learn effectively, study sessions need to be short and sweet. Fully engaged short bursts of studying. By studying in short bursts we can stay engaged easier'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Focused study period'}
    bodyText={'Using a timer, we can allocate a period for dedicated studying. Remove distractions and stay on the task at hand.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Recall'}
    bodyText={'To wrap up a study session, think about what you have studied and type it out. Everything that you type should be from memory.'}
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'When your done with a study sessions, take a break. Breaks are important in reseting our though process.'}
    />

    </GlobalSwiper>
    </Layout>

    
  )
};



export default HowToLearn