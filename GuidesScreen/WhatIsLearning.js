import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function WhatIsLearning(){

  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader title={'What is Learning?'}/>
    </View>
  
    <GlobalSwiper>


    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Building an understanding'}
    bodyText={'Learning starts from simple concepts and slowly building up. Know how concepts connect and impact to each other.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Learning is a constant process'}
    bodyText={'Learning is all putting in the time and effort in. Everytime you work towards learning you will understand it a bit more. Slowly build up.'}
    />

  {/*   <GuideComponent 
    picture={require('../assets/images/buildingpuzzle.png')} 
    headerText={'Building on the basics'}
    bodyText={'Learning is putting information you already know and building on top of it.'}
    /> */}

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Focused, Active, and Engaged'}
    bodyText={'Learning requires constant and engaged thinking with the topic at hand. Be focused and constantly in thought while you are learning. Constantly think about how concepts work and relate to each other'}
    />

   

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};



export default WhatIsLearning