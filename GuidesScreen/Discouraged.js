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
    
    <TopHeader title="Discouraged"/>

    
    <GlobalSwiper>
    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Learning new concepts is tough'}
    bodyText={'Learning new things is tough, yet rewarding.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Just start'}
    bodyText={"If you haven't put a lot of time into studying, starting will be one of the hardest parts. Do your best to jump into studying. You'll often find "}
    />

    <GuideComponent 
    picture={require('../assets/images/puttingintime.png')} 
    headerText={'Do what you can'}
    bodyText={'Some days you will be more motivated to study, and some days less. Do what you can, as any progress is good.'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/spreadout-01.png')} 
    headerText={'Focus on the process'}
    bodyText={'Learning takes time. Our minds will process information.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can understand complex concepts.'}
    bodyText={'With enough time and effort, you can build an understanding of difficult subjects.'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};


export default Discouraged