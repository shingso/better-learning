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
    bodyText={'Find out how much time you can manage to study per day comfortably. '}
    />


    <GuideComponent 
    picture={require('../assets/images/spreadout-01.png')} 
    headerText={'Spread your study sessions out'}
    bodyText={'Put your effort into studying consistently over the span of a week, rather than a lot in one day.'}
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