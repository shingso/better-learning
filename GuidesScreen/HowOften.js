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
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Do what is sustainable'}
    bodyText={'Try to figure out a good amount of study sessions that you can sustain to do day over day.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Spread your study sessions out'}
    bodyText={'Study evenly throughout the week, rather than a lot in one day.'}
    />

    <GuideComponent 
    picture={require('../assets/images/burnout.png')} 
    headerText={'Avoid burnout'}
    bodyText={'Do not push yourself to the point of exhaustion everyday. The more managable and realistic your study goals are, the more likely you will stick with it.'}
    />


    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Start with once a day'}
    bodyText={'If your just getting started with self-learning, do your best to study atleast once everyday.'}
    //Lot in one day is not conductive to building good study habits. The more that you do in a day the more tired and difficult working the other days will bve
    />  

  
    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default HowOften