import React from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function HowToLearn(){


  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <TopHeader title={'Learn better'}/>
    
    <GlobalSwiper>

    <GuideComponent 
    picture={require('../assets/images/thinkingv2-01.png')} 
    headerText={'Tune your attention to learning'}
    bodyText={'Learning comes best when we are deeply focused and engaged. When studying, give your full attention to learning.'}
    />

    <GuideComponent 
    picture={require('../assets/images/shortandsweet-01.png')} 
    headerText={'Short and sweet'}
    bodyText={'Staying focused for long periods of time is difficult. An effective and managable way to learn is with short study sessions.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/focusedstudy-01.png')} 
    headerText={'Timed study session'}
    bodyText={'A timer is a useful tool to stay engaged in learning. We are more inclined to maintain our attention when we set a dedicated time period for studying.'} 
    />

    
    <GuideComponent 
    picture={require('../assets/images/recall-01.png')} 
    headerText={"Think about what you've learned"} // By typing
    bodyText={"At the end of a study session, think about what you've learned and type it out. Doing so will help your brain process the new information."} //Everything that you type should be from memory.
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'After studying, take a break. Breaks refresh our attention span and allows us to be more productive in future study sessions.'} //Breaks help refresh our minds, which is important to learning. reset our thought process.
    />

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>

    
  )
};



export default HowToLearn