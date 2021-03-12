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
    bodyText={'Everyone struggles when it comes to learning. It takes a concentrated effort along with time.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Just start'}
    bodyText={'Try to study once everyday and aim to do what you can. Some days you might study a lot and some less. Any progress is good progress. Focus on the process.'}
    />

    <GuideComponent 
    picture={require('../assets/images/puttingintime.png')} 
    headerText={'Do what you can'}
    bodyText={'Judge a session based on whether or not you solved a problem or understood a concept. Whether or not you solved the problem or fully understood the concept is unimportant'}
    />
    
    <GuideComponent 
    picture={require('../assets/images/puttingintime.png')} 
    headerText={'Focus on the process'}
    bodyText={'Judge a session based on whether or not you solved a problem or understood a concept. Whether or not you solved the problem or fully understood the concept is unimportant'}
    />

   

    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};


export default Discouraged