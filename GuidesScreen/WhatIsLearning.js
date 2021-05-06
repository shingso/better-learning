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
    headerText={'Build an understanding'}
    bodyText={"Look to build an understanding inorder to retain infomation better and have applicable knowledge."}
    />
    

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'How each piece fits'}
    bodyText={"To build an understanding think about how new information connects with what you already know. Figure out how new concepts are related to the bigger picture."}
    />
    
    <GuideComponent 
    picture={require('../assets/images/puttingtimev2-01.png')} 
    headerText={'Learning is a constant process'}
    bodyText={"Expect to not understand everything at a first glance. As you put time into learning, you'll naturally clear up misconceptions and make new connections."}
    />

    <GuideComponent 
    picture={require('../assets/images/reviewnotesv2-01.png')} 
    headerText={'Review and revisit'}
    bodyText={"Reviewing past information will often fill up gaps in knowledge and strengthen our overall understanding."}
    />

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default WhatIsLearning