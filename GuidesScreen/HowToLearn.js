import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function HowToLearn(){


  return (
    <Layout style={{flex:1}}>
    <View style={{paddingLeft:16, paddingTop:4}}>
    <TopHeader title={'What is a study session?'}/>
    </View>
    
    <GlobalSwiper>

    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Time spent toward learning'}
    bodyText={'The most important aspect in understanding and learning anything is putting in the time. '}
    />
    
    <GuideComponent 
    picture={require('../assets/images/studytime.png')} 
    headerText={'Study Time'}
    bodyText={'When you start the study session a timer will start. This time is meant for study.'}
    />

    
    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Recall'}
    bodyText={'To wrap up a study session, think about what you have studied and type it out. Everything that you type should be from memory.'}
    />

    <GuideComponent 
    picture={require('../assets/images/takeabreak.png')} 
    headerText={'Take a break'}
    bodyText={'When your done recalling, take a break. Breaks are important in learning'}
    />

    </GlobalSwiper>
    </Layout>

    
  )
};



export default HowToLearn