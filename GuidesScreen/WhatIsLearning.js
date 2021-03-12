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
    <TopHeader title={'What is Learning?'}/>

  
    <GlobalSwiper>


    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Building an understanding'}
    bodyText={'To build an understanding, start by figuring out the basic concepts. As you gain a good grasp of the basics, you can build upon them.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Learning is a constant process'}
    bodyText={"As you put time into learning, you'll slowly clear up misconceptions and make connections. Everytime you study, you'll make progress into figuring out a concept as a whole"}
    />

    <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Learning is more than memorization'}
    bodyText={"Don't spend a lot of time memorizing. Instead, of knowing names and definitions, figure out how each variable works."}
    />

    {/* <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can get better at learning'}
    bodyText={'Learning requires constant and engaged thinking with the topic at hand. Be focused and constantly in thought while you are learning. Constantly think about how concepts work and relate to each other'}
    /> */}


    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can get better at learning'}
    bodyText={"Learning is a skill that can be developed. The more time you put into learning, the faster you'll get at putting concepts together."}
    />
   

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default WhatIsLearning