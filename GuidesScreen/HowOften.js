import React from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function HowOften(){

  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <TopHeader title='How often should I study?'/>
  
    
    <GlobalSwiper>

    

    <GuideComponent 
    picture={require('../assets/images/figureout-01.png')} 
    headerText={'Figure out what you can do'}
    bodyText={'Find out how much time you can put into studying every day comfortably. Set realistic and managable workloads.'}
    />

    <GuideComponent 
    picture={require('../assets/images/burnout.png')} 
    headerText={'Start small and work your way up'}
    bodyText={"If you're unsure how much you can study, aim for one study session per day. Scale your study sessions"}
    />

    <GuideComponent 
    picture={require('../assets/images/spreadout-01.png')} 
    headerText={'Spread your study sessions out'}
    bodyText={'The more consecutive days you study, the better you will learn. Put your effort into studying consistently over the span of a week, rather than a lot in one day.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/burnout.png')} 
    headerText={'Avoid burnout'}
    bodyText={"Trying to do a lot quickly isn't sustainable. Pace yourself and focus on the process of learning."}
    />

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default HowOften