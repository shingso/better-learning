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
    bodyText={'Learning comes best when we are deeply focused and engaged with the material. The longer we can maintain our attention, the better we will learn.'}
    />

    <GuideComponent 
    picture={require('../assets/images/thinkingv2-01.png')} 
    headerText={'Short and sweet'}
    bodyText={'We naturally dont have a very long attention span. We can learn more effectively by studying in short, deeply focused study sessions.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/focusedstudy-01.png')} 
    headerText={'Dedicated study time'}
    bodyText={'A timer is helpful in staying focused. By setting a dedicated period for studying, we are more inclined to maintain our attention.'} 
    />

    
    <GuideComponent 
    picture={require('../assets/images/recall-01.png')} 
    headerText={"Think about what you've learned"} // By typing
    bodyText={"At the end of your study period, think about what you have learned and type it out. Doing so will help reinforce what we've learned."} //Everything that you type should be from memory.
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'After studying, take a break.'} //Breaks help refresh our minds, which is important to learning. reset our thought process.
    />

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>

    
  )
};



export default HowToLearn