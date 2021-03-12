import React from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import GuideComponent from '../UtilComponents/GuideComponent'
import GlobalSwiper from '../UtilComponents/GlobalSwiper'

function Inspiration(){


  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <TopHeader title='Inspiration'/>

    
    <GlobalSwiper>

    <GuideComponent 
    picture={require('../assets/images/becomesmarterv1.png')} 
    headerText={'Become smarter'}
    bodyText={'Learning is a skill that can be developed. Being able to foucs and think about something you can get better at. The more time you spend thinking, the '}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'Put in the time and the results will come'}
    bodyText={'Small amounts of progress add up. Day by day progress might seem insignificant, but over a long period of time, your change in knowledge will be noticable.'}
    />

    <GuideComponent 
    picture={require('../assets/images/growingidea.png')} 
    headerText={'You can understand complex concepts and solve difficult problems.'}
    bodyText={'With enough time and effort, you can solve difficult problems. Our minds have the tendency to come up with solutions when are .'}
    />

    <GuideComponent 
    picture={require('../assets/images/success.png')} 
    headerText={'You can go further than you think'}
    bodyText={"Learning is all about putting the time in. You'll solve problems and understand concepts you never thought you could."}
    />

  
    </GlobalSwiper>
    </SafeAreaView>
    </Layout>)
};


export default Inspiration