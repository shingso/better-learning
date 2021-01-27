import React, { useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import { addSubject } from '../helperFunctions';
import { Button, Text ,Icon , Modal, Input, Card, useTheme, Layout } from '@ui-kitten/components';
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
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();
  const theme = useTheme()

  return(
           
    <Layout style={{padding:20 , flex:1}}>
    <Formik
    initialValues={{ subject:''}}
    validationSchema={SubjectSchema}
    onSubmit={(values, actions) => {
     addSubject( authContext.user.uid, values.subject )
     actions.setSubmitting(false);
     setVisible(true)
    }}
   >

    {formikProps => (
   
   <React.Fragment >
   <TopHeader title={'Add a New Folder'}/>

   <Text style={{marginBottom:8,marginTop:20}}>Use folders to furthur organize your notes.</Text>
   <Text style={{marginBottom:40}}>You can select a folder to store your note into when you are adding a note</Text>
   
    <Text>{formikProps.errors.subject}</Text>
    <Input
    placeholder='What are you learning about?'
    value={formikProps.values.subject}
    size='large'
    onChangeText={formikProps.handleChange('subject')}
    status={formikProps.errors.subject != null ? 'danger' : 'basic'}
    style={{borderColor:theme['color-basic-100']}}
    autoFocus={true}
      />
    
    <View style={{ justifyContent:'flex-end'}}>
    <Button style={{marginTop:40, borderRadius:30}} onPress={()=>formikProps.handleSubmit()}>
      Add Folder
    </Button>
    </View>

    <Modal
    visible={visible}
    backdropStyle={styles.backdrop}>
    <Card style={{width:180, height:160}} disabled={true}>
    <ImageBackground opacity={0.10} resizeMode='contain'source={require('../assets/images/progress.png')} style={styles.image}>
    <View style={{ height:140}}>
    <View style={{flex:1}}>
    <Text category='s1' style={{textAlign:'center', marginTop:12}}>The first step...</Text>
    <Text category='s1' style={{textAlign:'center', marginTop:12}}>But just one of many to come</Text>
    </View>
    
    <View style={{flex:1, justifyContent:'flex-end'}}>
    <Button size='small' style={{marginBottom:8}} onPress={()=>{navigation.goBack()}}>
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

  image: {

    height:180,
    margin:-24,
    padding:18

  }
});

export default AddSubject