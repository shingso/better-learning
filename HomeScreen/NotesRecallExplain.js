import React, { useContext, useState, useEffect } from 'react';
import { View , StyleSheet, Image } from 'react-native';
import { Button, Text ,Icon , Input, Modal, Card, useTheme, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import Swiper from 'react-native-swiper'
import { useNavigation, StackActions } from '@react-navigation/native';

const TextComponent = (props) => {

    return(
        <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:16}}>
        <Text category='h5' style={{textAlign:'center', lineHeight:36, paddingHorizontal:12}}>{props.bodyText}</Text>
        </View>
    )
}

function NotesRecallExplain(){
  const navigation = useNavigation()
  const theme = useTheme();
  const [confirmBackVisible, setConfirmBackVisible] = React.useState(false);
  const [leaveScreen, setLeaveScreen ] = React.useState(false);

  const popToTop = () => {

    navigation.dispatch(StackActions.popToTop())
  }

  const navigateToRecall = () =>{
    navigation.pop()
    navigation.navigate('NotesRecall')
  }

/* 
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
  ); */



  return (
    <Layout style={{flex:1}}>
 
    

    <TextComponent
    bodyText={"Let's review a past note or concept and write our thoughts about it"}
    />

    <TextComponent
    bodyText={"Writing anything that comes to your mind. It could be something you already know or something new."}
    />

   

    <Button onPress={navigateToRecall} style={{marginBottom:40, marginHorizontal:20}}>I'm ready</Button>

   

   


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
  


});

export default NotesRecallExplain