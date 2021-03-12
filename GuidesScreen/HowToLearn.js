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
    <TopHeader title={'How should I be learning?'}/>
    
    <GlobalSwiper>

    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Short and sweet'}
    bodyText={'Learning comes best when we commit our full attention to it. But long periods of deeply focused attention are difficult to sustain. By studying in short periods, we can learn more effectively.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Focused study period'}
    bodyText={'We can allocate a period for dedicated studying by using a timer. When the timer is running, stay focused on learning and be mindful of when your attention wanders.'} //
    />

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={"Recall what you've learned"} // By typing
    bodyText={'When the study period has ended, think about what you have learned and type it out. Everything you type out should be from memory.'} //Everything that you type should be from memory.
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'After a study session, take a break. Breaks helps our minds unwind and process information.'} //Breaks help refresh our minds, which is important to learning. reset our thought process.
    />

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>

    
  )
};



export default HowToLearn