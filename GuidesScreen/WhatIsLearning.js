import React from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function WhatIsLearning(){

  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <TopHeader title={'How should I be learning?'}/>

  
    <GlobalSwiper>


    <GuideComponent 
    picture={require('../assets/images/buildingidea-01.png')} 
    headerText={'Look to build an understanding'}
    bodyText={"To deelpy learning something, look to build an understanding. "}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'How each piece fits'}
    bodyText={"When learning, think about the new information connects with information you already know. . "}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Step by step'}
    bodyText={"We often wont understand something the first time we look at it. Learning is about making progress."}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Active thought and engagment'}
    bodyText={"Learning requires active thought."}
    />
  
    
    <GuideComponent 
    picture={require('../assets/images/puttingtimev2-01.png')} 
    headerText={'Learning is a constant process'}
    bodyText={"As you put time into learning, you'll naturally clear up misconceptions and make new connections."}
    />
{/* 
    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Learning is more than memorization'}
    bodyText={"Don't spend a lot of time memorizing. Putting time into carefully thinking about ."}
    /> */}

    {/* 
    /connect new information with information you already know. Think about how  Build on key concepts
    Learning is about making progress
    
    */}

    {/*Figuring out the context of a piece of information, greatly helps the retention  */}



   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default WhatIsLearning