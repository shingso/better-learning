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
    bodyText={'Learning is a process. An ever lasting journey of building on knowledge.'}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'How each piece fits'}
    bodyText={"Figure out how each piece of new information fits in with what you already know. Think about how individual concepts are connected."}
    />

  
    
    <GuideComponent 
    picture={require('../assets/images/puttingtimev2-01.png')} 
    headerText={'Learning is a constant process'}
    bodyText={"As you put time into learning, you'll clear up misconceptions and make connections. The more time you put into learning the better your understanding will be."}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Learning is more than memorization'}
    bodyText={"Don't spend a lot of time memorizing. You can retain information better by putting time into building an understanding."}
    />

    {/*Figuring out the context of a piece of information, greatly helps the retention  */}


    {/* <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can get better at learning' Figuring out how concepts work together greatly internalizes the concept}
    bodyText={"Learning is a skill that can be developed. The more time you put into learning, the faster you'll get at putting concepts together."}
    /> */}
   

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default WhatIsLearning