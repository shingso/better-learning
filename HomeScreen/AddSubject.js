import React, { useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { addNotesCollection } from '../helperFunctions';
import { Button, Text ,Icon , Modal, Input, Card} from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import TopHeader from '../UtilComponents/TopHeader'
//background timer module
//sign up


const SubjectSchema = Yup.object().shape({
  subject: Yup.string()
    .min(1, 'Too Short!')
    .max(80, 'Too Long!')
    .required('You need to put a title'),

});


function AddSubject(){
  const [visible, setVisible] = React.useState(false);
  const user = useContext(AuthContext)
  const navigation = useNavigation();
  return(
           
    <KeyboardAvoidingView behavior='position' style={{ flex: 1, padding:16}}>
    <Formik
    initialValues={{ subject:''}}
    validationSchema={SubjectSchema}
    onSubmit={(values, actions) => {
     addNotesCollection( user.uid,values.subject )
     actions.setSubmitting(false);
     setVisible(true)
    }}
   >

    {formikProps => (
   
   <React.Fragment>
    <TopHeader/>
    <Text category='h1' style={{marginBottom:20}}>Getting Started</Text>
    
    <Text style={{marginBottom:12}}>Think of a subject that you want to learn.</Text>
    <Text style={{marginBottom:40}}>Learning comes best when its something that you want to learn, a subject that you find valuable in growing and getting better in 
    </Text>
   
    <Text>So what is a subject you are interested in learning?</Text>
    <Text>{formikProps.errors.subject}</Text>
    <Input
    placeholder='Enter subject title'
    value={formikProps.values.subject}
    size='large'
    onChangeText={formikProps.handleChange('subject')}
    status={formikProps.errors.subject != null ? 'danger' : 'basic'}
      />
    
    <View style={{ justifyContent:'flex-end'}}>
    <Button style={{marginTop:40}} onPress={()=>formikProps.handleSubmit()}>
      Add Subject
    </Button>
    </View>

    <Modal
    visible={visible}
    backdropStyle={styles.backdrop}
    onBackdropPress={() => navigation.navigate('Home')}
    >
    <Card disabled={true}>
    <Text>Subject Added!</Text>
    <Button size='small' onPress={() => navigation.navigate('Home')}>
    DISMISS
    </Button>
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
});

export default AddSubject