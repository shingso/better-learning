import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function Inspiration(){


  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4, flexDirection:'row', alignItems:'center'}}>
    <TopHeader title='Inspiration'/>
    </View>
    
    <GlobalSwiper>

    <GuideComponent 
    picture={require('../assets/images/becomesmarterv1.png')} 
    headerText={'Become Smarter'}
    bodyText={'Learning is a skill that can be developed. The more you study the smarter you will become.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Put in the time and the results will come'}
    bodyText={'Small amounts of progress add up. Day by day progress might seem insignificant, but over a long period of time, your progress will become more apparent.'}
    />

    <GuideComponent 
    picture={require('../assets/images/success.png')} 
    headerText={'You can go further than you think'}
    bodyText={"With enough time and effort you can solve difficult problems and understand complex concepts."}
    />

  
    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};


export default Inspiration