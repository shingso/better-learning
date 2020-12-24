import React, { useContext, useState, useEffect } from 'react';
import { View , StyleSheet, Image } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import { useNavigation, StackActions } from '@react-navigation/native';

const TextComponent = (props) => {

    return(
        <View style={{borderColor:'red', borderWidth:1, flex:1, justifyContent:'center', alignItems:'center', padding:16}}>
        <Text category='h5' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12}}>{props.bodyText}</Text>
        </View>
    )
}

function RecallExplain(){
  const navigation = useNavigation()
  const theme = useTheme();
  const [confirmBackVisible, setConfirmBackVisible] = React.useState(false);
  const [leaveScreen, setLeaveScreen ] = React.useState(false);

  const popToTop = () => {

    navigation.dispatch(StackActions.popToTop())
  }

  const navigateToRecall = () =>{
    setLeaveScreen(true)
    navigation.navigate('Recall')
  }


  useEffect(() => {

    if( confirmBackVisible || leaveScreen ){
      return;
    }

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    
      e.preventDefault();
      setConfirmBackVisible(true)

    })

    return unsubscribe
    
   
  },

    
  [navigation, confirmBackVisible, leaveScreen]
  );



  return (
    <Layout style={{flex:1}}>
    <View style={{justifyContent:'flex-end'}}>
    <Button style='small' appearance='ghost' onPress={navigateToRecall}>
    Skip
    </Button>
    </View>
    
    <Swiper showsButtons={true} activeDotColor={theme['color-primary-default']} activeDotStyle={{marginBottom:20}} dotStyle={{marginBottom:20}} prevButton={<Text></Text>} nextButton={<Text status='primary' style={[styles.nextButtonStyle,{borderColor:theme['color-primary-default']}]}>Next</Text>} buttonWrapperStyle={{alignItems:'flex-end'}} style={styles.wrapper} loop={false} index={0}>
    

    <TextComponent

    bodyText={'To wrap up our study session we are now going to recall what we have learned'}
    />

    <TextComponent
  
    bodyText={'In the next screen write down everything that you have learned'}
    />

    <TextComponent
  
    bodyText={'Everything that you write out should be from memory and during this recall sessions you should not look at any material'}
    />

   

    </Swiper>

    <Modal
    visible={confirmBackVisible}
    backdropStyle={styles.backdrop}
    >

    <Card style={{marginHorizontal:40}} disabled={true}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text style={{marginVertical:12, marginBottom:24 ,textAlign:'center'}}>Recall is important to learning</Text> 
    <View style={{flexDirection:'row', marginBottom:8}}>
        
    <Button status='danger' style={{marginRight:12}} onPress={popToTop}>
    Leave
    </Button>

    <Button appearance='outline' onPress={()=>setConfirmBackVisible(false)}>
    Close
    </Button>
    </View>
    </View>
    </Card>
    </Modal> 

    </Layout>

    
  )
};


const styles = StyleSheet.create({
  

  nextButtonStyle:{
    marginBottom:12, 
    marginRight:20, 
    borderWidth:1, 
    padding:14, 
    borderRadius:6, 
    paddingHorizontal:22
  },

  prevButtonStyle:{
    marginBottom:12, 
    marginLeft:20, 
    borderWidth:1,
    padding:14, 
    borderRadius:6, 
    paddingHorizontal:22
  }

});

export default RecallExplain