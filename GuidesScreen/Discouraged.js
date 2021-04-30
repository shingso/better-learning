import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function Discouraged(){

  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    
    <TopHeader title="Can't get into learning"/>

    
    <GlobalSwiper>


    <GuideComponent 
    picture={require('../assets/images/juststart-01.png')} 
    headerText={'Jump into studying'}
    bodyText={"Getting started is one of the hardest parts. Do your best to start and you'll often get into the flow of studying."}
    />

    <GuideComponent 
    picture={require('../assets/images/dowhatyoucan-01.png')} 
    headerText={'Do what you can'}
    bodyText={"Some days you will be more motivated to study and other days less. Making progress is the goal, and any amount of progress is good."}
    />
    
    <GuideComponent 
    picture={require('../assets/images/focusprocess-01.png')} 
    headerText={'Process and progress'}
    bodyText={"Focus on the process. Every day put time into taking the next step and making progress."}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can understand complex concepts'}
    bodyText={"With enough time and effort you can build an understanding of difficult subjects. Know that you can solve most problems with enough persistence."}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};


export default Discouraged