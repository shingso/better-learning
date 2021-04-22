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
    bodyText={'Learning comes best when we are deeply focused and engaged with the material. Do your best to maintain your focus, commiting time to studying.'}
    />

    <GuideComponent 
    picture={require('../assets/images/thinkingv2-01.png')} 
    headerText={'Short and sweet'}
    bodyText={'Staying deeply focused for long periods is difficult. A managable and effective way to learn is with short and focused study periods.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/focusedstudy-01.png')} 
    headerText={'Timed study session'}
    bodyText={'We can   A timer is helpful with staying engaged in learning. Use a timer to set a dedicated time period for study.'} 
    />

    
    <GuideComponent 
    picture={require('../assets/images/recall-01.png')} 
    headerText={"Think about what you've learned"} // By typing
    bodyText={"Actively thinking about what we've learned helps us process the information. At the end of a study session, think about what you've learned about and type it out."} //Everything that you type should be from memory.
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'After studying, take a break. Breaks help relax our brains and reset our attention'} //Breaks help refresh our minds, which is important to learning. reset our thought process.
    />

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>

    
  )
};



export default HowToLearn