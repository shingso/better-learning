import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function HowOften(){

  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4}}>
    <TopHeader title='How often should I study?'/>
    </View>
    
    <GlobalSwiper>
    

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Do what is sustainable'}
    bodyText={'Build consistent studying habits. Aim to study everyday. This means doing what you think you can do over a period of a week.'}
    />

    <GuideComponent 
    picture={require('../assets/images/burnout.png')} 
    headerText={'Avoid burnout'}
    bodyText={'Do not push yourself to the point of exhaustion everyday. The more managable to set up your study goals, the more likely you will stick with it for the long term'}
    />

   {/*  <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Once per day is a good starting goal'}
    bodyText={'Try to study once per day. If you can manage one study session per day, you will make extradionary amounts of progress'}
    /> */}

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Slowly ramp up your study session'}
    bodyText={'When you get into the rhythm of studying consistently, you can add more study sessions.'}
    //Lot in one day is not conductive to building good study habits. The more that you do in a day the more tired and difficult working the other days will bve
    />

  
    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default HowOften