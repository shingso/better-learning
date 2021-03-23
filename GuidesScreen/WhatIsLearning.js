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
    bodyText={'Start by figuring out the basics. Slowly build on the basics'}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'How each piece fits'}
    bodyText={"Think about how individual concepts are related and connected to each other. Figuring out how concepts work together greatly internalizes the concept."}
    />
    
    <GuideComponent 
    picture={require('../assets/images/puttingtimev2-01.png')} 
    headerText={'Learning is a constant process'}
    bodyText={"As you put time into learning, you'll clear up misconceptions and make connections."}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Learning is more than memorization'}
    bodyText={"Don't spend a lot of time memorizing. You can retain information better by putting time into understanding."}
    />

    {/* <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can get better at learning'}
    bodyText={'Learning requires constant and engaged thinking with the topic at hand. Be focused and constantly in thought while you are learning. Constantly think about how concepts work and relate to each other'}
    /> */}


    {/* <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can get better at learning'}
    bodyText={"Learning is a skill that can be developed. The more time you put into learning, the faster you'll get at putting concepts together."}
    /> */}
   

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default WhatIsLearning