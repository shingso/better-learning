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
    bodyText={'Find out how much time you can put into studying comfortably. Studying at a sustainable pace is best for the overall learning process.'}
    />

    <GuideComponent 
    picture={require('../assets/images/startsmall-01.png')} 
    headerText={'Start small and work your way up'}
    bodyText={"If you're just getting started, start small. One study session per day is a good starting pace which can result in noticeable progress."}
    />

    <GuideComponent 
    picture={require('../assets/images/spreadout-01.png')} 
    headerText={'Spread your study sessions out'}
    bodyText={'The more consecutive days you study, the better you will learn. Put your effort into studying consistently over the span of a week rather than a lot in a day.'}
    />
    
   {/*  <GuideComponent 
    picture={require('../assets/images/burnout.png')} 
    headerText={'Avoid burnout'}
    bodyText={"Burning out and breaking out habit of studying will greatly impede your learning. "}
    /> */}

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default HowOften