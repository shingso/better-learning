import React, { useContext, useState, useEffect } from 'react';
import { View , StyleSheet, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import { addNote } from '../helperFunctions';
import { Button, Text ,Icon , Input, Modal, Card, Layout } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';


const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Its crucial to recall inorder to learn')
    .max(200, 'Too Long!')
    .required('Type out what you have learned below '),

});





function Recall({ route }){
 
  const [visible, setVisible] = React.useState(false);
  const [confirmBackVisible, setConfirmBackVisible] = React.useState(false);
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();

  const { subjectID } = route.params
  const { mode } = route.params


  useEffect(() => {

    if( confirmBackVisible || visible ){
      return;
    }

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {

      e.preventDefault();
      setConfirmBackVisible(true)

    })

    return unsubscribe
    
   
  },

    
  [navigation, confirmBackVisible, visible]
);


  const confirmAddNote = () => {
    setVisible(false)

    navigation.dispatch(StackActions.popToTop())
  }

  
  const confirmAddNoteBreak = () => {

    setVisible(false)
    navigation.pop()
    navigation.navigate('Break', { mode:mode, subjectID: subjectID })
  }

  const popToTop = () => {
    navigation.dispatch(StackActions.popToTop())
  }


  return(
           
    <Layout style={{ flex: 1, padding:16 }}>
    <ImageBackground style={{flex:1}} resizeMode={'contain'} opacity={0.1} source={require('../assets/images/boystudyingv1.png')}>
    <Formik
    initialValues={{ text:'', textTheme:''}}
    validationSchema={TextSchema}
    onSubmit={(values, actions) => {
     addNote( authContext.user.uid, subjectID , values.text, values.textTheme)
     setVisible(true)

    }}
   >

    {formikProps => (

   <React.Fragment>
   <View>
   <TopHeader/>
   <Text category='h1' style={{marginBottom:20}}>Recall</Text>
   <Text category='s1'>Take some time and think about what you have just studied or practiced.</Text>
   <Text category='s1' style={{marginVertical:12, marginBottom:20}}>Type out what you have learned.</Text>
   <Text>Everything you type here should be from memory and be done without looking at any material.</Text>
   </View>

   <View style={{marginVertical:20}}>
   {formikProps.errors.text && formikProps.touched.text ? <Text style={{marginVertical:4}}>{formikProps.errors.text}</Text> : null}
      
   <Input
   textStyle={{fontSize:16}}
   style={{marginBottom:12}}
   multiline={true}
   placeholder='Overarching theme?'
   onChangeText={formikProps.handleChange('textTheme')}
    />
   
   <Input
    textStyle={{fontSize:16, height:100}}
    multiline={true}
    placeholder='What did you learn about?'
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
    />

   </View>

    <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()} >
      Done
    </Button>
      
    <Modal
    visible={visible}
    backdropStyle={styles.backdrop}>
    <Card disabled={true}>
    <Text>Note Added!</Text>
    {mode == 'BASIC'  &&
    <Button size='small' onPress={confirmAddNote}>
    DISMISS
    </Button>
    }


    {mode == 'ADVANCED' &&
    <Button size='small' onPress={confirmAddNoteBreak}>
    Its time for a break
    </Button>
    } 
    </Card>
    </Modal>  

    <Modal
    visible={confirmBackVisible}
    backdropStyle={styles.backdrop}
    >

    <Card style={{marginHorizontal:40}} disabled={true}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text style={{marginVertical:12, marginBottom:24 ,textAlign:'center'}}>Writing something down is crucial to learning!</Text> 
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
      
    </React.Fragment>
    )}
  </Formik>
  </ImageBackground>
  </Layout>

    )
};


const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Recall