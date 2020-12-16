import React, { useContext, useState } from 'react';
import { View , StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import { addNote } from '../helperFunctions';
import { Button, Text ,Icon , Input, Modal, Card } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';



const CheckIcon = (props) => (
  <Icon {...props} width='30' height='30' name='checkmark' />
);
 

const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Its crucial to recall inorder to learn')
    .max(200, 'Too Long!')
    .required('Required'),
  
  text: Yup.string()
    .max(200, 'Too Long!')
    
});



function AddNotes({ route }){
 
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState(null);
  const user = useContext(AuthContext)
  const navigation = useNavigation();
  const { subjectID } = route.params



  const confirmAddNote = () => {
    setVisible(false)
    navigation.dispatch(StackActions.popToTop())
  }

  return(
           
    <KeyboardAvoidingView behavior='position' style={{ flex: 1, padding:16}}>
      
    <Formik
    initialValues={{ text:'', textTheme:''}}
    validationSchema={TextSchema}
    onSubmit={(values, actions) => {
     addNote( user.uid, subjectID , values.text, values.textTheme)
     //actions.setSubmitting(false);
     setVisible(true)

    }}
   >

    {formikProps => (

   <React.Fragment>
   <View>
   <TopHeader/>
   <Text category='h1' style={{marginBottom:20}}>Write Something</Text>
   <Text category='s1' style={{marginBottom:8}}>If you figured out something new, write it down!</Text>
   <Text>The more you write out the better the information will be processed and stored in your head</Text>
   </View>

   <View style={{marginVertical:20}}>

   <Text style={{marginTop:20, marginBottom:8}}>What is the overarching concept?  <Text appearance='hint'>Optional</Text></Text>
   <Input
   textStyle={{fontSize:16}}
   style={{marginBottom:20}}
   
   
   onChangeText={formikProps.handleChange('textTheme')}
    />
  
  <Text style={{marginTop:12, marginBottom:8}}>What did you learn about?</Text>
   {formikProps.errors.text && formikProps.touched.text ? <Text style={{marginVertical:4}}>{formikProps.errors.text}</Text> : null}
   
   <Input
    textAlignVertical={'top'}
    textStyle={{fontSize:16, height:80, paddingTop:4}}
    multiline={true}
    
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
      />

   </View>

    <Button style={{marginVertical:16}} size='small' accessoryRight={CheckIcon} onPress={()=>formikProps.handleSubmit()}>
  
    </Button>
      
    <Modal
    visible={visible}
    backdropStyle={styles.backdrop}>
    <Card style={{width:180, height:120}} disabled={true}>
    <ImageBackground opacity={0.10} resizeMode='contain'source={require('../assets/images/progress.png')} style={styles.image}>
    <View style={{ height:100}}>
    <View style={{flex:1}}>
    <Text category='s1' style={{textAlign:'center', marginTop:12}}>Another note added!</Text>
    </View>
    
    <View style={{flex:1, justifyContent:'flex-end'}}>
    <Button size='small' style={{marginBottom:8}} onPress={confirmAddNote}>
    DISMISS
    </Button>
    </View>
    
    </View>


    </ImageBackground>
    </Card>
    </Modal>          
    </React.Fragment>
    )}

  </Formik>
  </KeyboardAvoidingView>

    )
};


const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  image: {

    height:120,
    margin:-24,
    padding:18
  },

});

export default AddNotes