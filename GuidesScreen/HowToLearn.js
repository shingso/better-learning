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
    bodyText={'Learning comes best when we are deeply focused and engaged with the material. The more focused our attention, the better we will learn.'}
    />

    <GuideComponent 
    picture={require('../assets/images/thinkingv2-01.png')} 
    headerText={'Short and sweet'}
    bodyText={'We dont naturally have a very long attention span. An effective way to study and learn is in short and focused periods.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/focusedstudy-01.png')} 
    headerText={'Dedicated study time'}
    bodyText={'A timer is helpful with staying focused. Setting a dedicated time period for studying helps us maintain our focus.'} 
    />

    
    <GuideComponent 
    picture={require('../assets/images/recall-01.png')} 
    headerText={"Think about what you've learned"} // By typing
    bodyText={"At the end of your study period, think about what you have learned and type it out. Doing so will encourage connections to be made in our brains."} //Everything that you type should be from memory.
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'After studying, take a break. Breaks help relax   '} //Breaks help refresh our minds, which is important to learning. reset our thought process.
    />

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>

    
  )
};



export default HowToLearn