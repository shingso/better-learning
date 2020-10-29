import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
    .required('Required'),

});


function AddSubject(){
  const [visible, setVisible] = React.useState(false);
  const user = useContext(AuthContext)
  const navigation = useNavigation();
  return(
           
    <View style={{ flex: 1, justifyContent:'center', padding:16}}>
    <Formik
    initialValues={{ subject:''}}
    validationSchema={SubjectSchema}
    onSubmit={(values, actions) => {
     addNotesCollection( user.uid,values.subject)
     actions.setSubmitting(false);
     setVisible(true)
    }}
   >

    {formikProps => (
   
   <React.Fragment>
     <TopHeader/>
    <Input
    label='Subject'
    placeholder='Enter subject title'
    value={formikProps.values.subject}
    size='large'
    onChangeText={formikProps.handleChange('subject')}
      />
  
    <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()} />
    <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => navigation.navigate('Home')}
        >
        <Card disabled={true}>
          <Text>Study Subject Added!</Text>
          <Button size='small' onPress={() => navigation.navigate('Home')}>
            DISMISS
          </Button>
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

export default AddSubject