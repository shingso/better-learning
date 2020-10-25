import React, { useContext, useState } from 'react';
import { View , StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { addNote } from '../helperFunctions';
import { Button, Text ,Icon , Input, Modal, Card } from '@ui-kitten/components';
import {AuthContext } from '../AuthContext'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
//background timer module
//sign up

const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),

});


function AddNotes({ route }){
 
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState(null);
  const user = useContext(AuthContext)
  const navigation = useNavigation();
  const { id } = route.params
  const { mode } = route.params


  const confirmAddNote = () => {
    setVisible(false)
    navigation.navigate('Home')
  }

  
  const confirmAddNoteReset = () => {
    setVisible(false)
    navigation.navigate('TimerScreen', { mode:'BREAK' })
  }


  const handleChange = (value) => {
    if (text !== value) {
      // remember that onChangeText will be Formik's setFieldValue
      this.props.onChangeText(this.props.name, value)
      setText({ value })
    }
  }

  return(
           
    <View style={{ flex: 1, justifyContent:'center', padding:16}}>
    <Formik
    initialValues={{ text:''}}
    validationSchema={TextSchema}
    onSubmit={(values, actions) => {
     addNote( user.uid, id , values.text)
     //actions.setSubmitting(false);
     setVisible(true)

    }}
   >



    {formikProps => (


   
   <React.Fragment>
   {formikProps.errors.text && formikProps.touched.text ? <Text>{formikProps.errors.text}</Text> : null}
    <Input
    label='Add A Note'
    placeholder='What did you learn about today?'

    size='large'
    onChangeText={formikProps.handleChange('text')}
      />

    <Text>{mode}</Text>
  
    <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()} >
      SUBMIT
    </Button>
      
    <Modal
 
        visible={visible}
        backdropStyle={styles.backdrop}
        >
        <Card disabled={true}>
          <Text>Note Added!</Text>
          {mode == 'BASIC' &&
          <Button size='small' onPress={() => confirmAddNote()}>
            DISMISS
          </Button>
          }

        {mode == 'ADVANCED' &&
          <Button size='small' onPress={() => confirmAddNoteReset()}>
            GO BACK
          </Button>
          } 
        </Card>
      </Modal>      
      
    </React.Fragment>
    )}
  </Formik>
  </View>

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

export default AddNotes