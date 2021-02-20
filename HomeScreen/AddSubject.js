import React, { useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import { addSubject } from '../helperFunctions';
import { Button, Text ,Icon , Modal, Input, Card, useTheme, Layout } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import TopHeader from '../UtilComponents/TopHeader'
import ConfirmComponent from '../UtilComponents/ConfirmComponent'






const SubjectSchema = Yup.object().shape({
  subject: Yup.string()
    .min(1, 'Too Short!')
    .max(80, 'Maximum 80 characters for folder title')
    .required('Folder Title Required'),

});


function AddSubject(){
  const [folderAdded, setFolderAdded] = React.useState(false);
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();
  const theme = useTheme()



  if(folderAdded){
    return(
      <Layout style={{ flex: 1, padding:16}}>

      <ConfirmComponent 
      picture={require('../assets/images/newfolder.png')}
      buttonText={'Back'}
      headerText={'Folder Created!'}
      bodyText={'Use folders to group together notes of a similar subject.'}
      onPress={()=>{navigation.goBack()}}
      />


      </Layout>
    )
  }

  return(
           
    <Layout style={{padding:20 , flex:1}}>
    <Formik
    initialValues={{ subject:''}}
    validationSchema={SubjectSchema}
    onSubmit={(values, actions) => {
     addSubject( authContext.user.uid, values.subject )
     actions.setSubmitting(false);
     setFolderAdded(true)
    }}
   >

    {formikProps => (
   
   <React.Fragment >
   <TopHeader title={'Add Folder'}/>

   <View style={{marginLeft:20}}>
   <Text style={{marginBottom:32,marginTop:20, fontWeight:'bold'}}>Use folders to group notes of a subject together.</Text>


   <Text>{formikProps.errors.subject}</Text>
   </View>

    <Input
    placeholder="What's your folder title? ex: Algebra, English, "
    value={formikProps.values.subject}
    size='large'
    onChangeText={formikProps.handleChange('subject')}
    status={formikProps.errors.subject != null ? 'danger' : 'basic'}
    style={{borderColor:theme['color-basic-100']}}
    autoFocus={true}
      />
    
    <View style={{ justifyContent:'flex-end'}}>
    <Button style={{marginTop:52, borderRadius:30, marginHorizontal:8}} onPress={()=>formikProps.handleSubmit()}>
      Add Folder
    </Button>
    </View>
 
    </React.Fragment>
    )}
    </Formik>
    </Layout>


    )
};


export default AddSubject