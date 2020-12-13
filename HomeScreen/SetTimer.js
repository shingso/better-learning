import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, StyleSheet, ImageBackground} from 'react-native'
import { Button, Icon,  Card, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'




  const ClockIcon = (props) => (
    <Icon {...props} width={30} height={30} name='clock-outline' />
  );


function SetTimer({ route }){
 
    const [mode, setMode] = React.useState('BASIC');
    const navigation = useNavigation();
    const { subjectID } = route.params

    const customNav = () => {
      navigation.navigate("TimerScreen", { mode:mode, subjectID: subjectID })
    }

    return (
    <Layout level='2' style={{flex:1}}>
    <SafeAreaView style={{flex: 1, padding:16}}>
    <TopHeader/>
    
    <Text style={{marginBottom:20}}  category='h1'>Choose a study session</Text>    
    <ImageBackground style={{flex:1}} resizeMode={'contain'} opacity={0.1} source={mode == 'BASIC' ? require('../assets/images/boystudyingv1.png') : require('../assets/images/blogpostv2.png')}>
    <View style={{marginBottom:12}}>
    <View style={{flexDirection:'row', alignItems:'flex-end', marginBottom:12}}>
    <Text  category='h1'>{mode == 'BASIC' ? 'Starter' : 'Advanced'}</Text>  
    
    {mode == 'BASIC' &&
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:7, marginLeft:20}}>
    <Icon fill='green' width={15} height={15} name='alert-circle-outline' />
    <Text style={{ marginLeft:4,color:'green'}}>Recommended</Text>  
    </View>
    }
    </View>


    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{marginRight:8}}>Study Period:</Text>
    <Icon fill='black' width={15} height={15} name='clock-outline' />
    <Text style={{marginLeft:8}}>{mode == 'BASIC' ? '25 mins' : '1 hour'}</Text>
    </View>
    
    </View>

    <Text>
    {mode == 'BASIC' ? 'Start building good study habits by studying for 25 mintues' : 'A longer study session for people with established study habits'}
    </Text>
        
    <View style={{ flex:1, marginBottom:36 , justifyContent:'flex-end'}}>
    <Button style={{marginBottom:30}} onPress={customNav}>
      START
    </Button>

    <View style={{ flexDirection:'row' }}>
      <Button style={styles.button} appearance={mode == 'BASIC' ? 'outline' : 'ghost'} onPress={()=>setMode('BASIC')}>
      STARTER
    </Button>

    <Button style={styles.button} appearance={mode == 'ADVANCED' ? 'outline' : 'ghost'} onPress={()=>setMode('ADVANCED')}>
      ADVANCED
    </Button>
    
    </View>
    </View>
    </ImageBackground>
    </SafeAreaView>
    </Layout>
      
      
    );

      //we need to update state when we add an item
    
    }

export default SetTimer


const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
        marginBottom:20
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',

    },
    footerControl: {
      marginHorizontal: 2,
    },
  });