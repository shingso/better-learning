import React, { useState, useEffect, useContext } from 'react'
import { TextInput, View, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';
import GlobalStyle from '../constants'
import { Formik } from 'formik';
import { Button, Text ,Icon, Input, Layout, Modal, Card, useTheme} from '@ui-kitten/components';
import * as Yup from 'yup';
import TopHeader from '../UtilComponents/TopHeader'



const RecoverSchema = Yup.object().shape({
  email: Yup.string().email()
    .max(100, 'Too Long!')
    .required('Required'),

});





function ForgotPassword(){
    const theme = useTheme()
    const navigation = useNavigation();
    const [ errorMessage, setErrorMessage] = useState('')
    const [ visible, setVisible ] = useState(false)


     return (

      <SafeAreaView style={{flex:1}}>
      <TopHeader title={'Reset Password'}/>
      <View style={{ flex: 1, padding:20, paddingBottom:40}}>
 
      <View>
      <Text category='h6' style={{marginBottom:12}}>Let's work on getting you back into your account.</Text>
      </View>
      <View>
      <Text style={{marginBottom:20}}>Enter the email address that you used to sign up with.</Text>
      </View>
      <Formik
      initialValues={{ email:'' }}
      validationSchema={RecoverSchema}
      onSubmit={(values, actions) => {
       auth().sendPasswordResetEmail(values.email).then(()=>{setVisible(true)}).catch(error => { 
        if(error.code == 'auth/user-not-found'){   
         setErrorMessage('User Not Found')}

        if(error.code == 'auth/invalid-email') {
         setErrorMessage('Invalid Email')
        }
        }) // if theres an error raise and error else 
       actions.setSubmitting(false);
      
       
      }}
    >

      
    {formikProps => (
    <React.Fragment>
    
    {errorMessage != '' && <Text style={{fontFamily:'Poppins-Bold', marginBottom:-4, fontSize:12, color:theme['color-danger-500'] }}>{errorMessage}</Text>}
    
    <Input
    placeholder='Email address'
    value={formikProps.values.email}
    label={formikProps.touched.email && formikProps.errors.email}
    size='large'
    status={formikProps.touched.email && formikProps.errors.email != null ? 'danger':'basic'}
    onChangeText={formikProps.handleChange('email')}
    textStyle={{fontSize:14}}
    style={{marginVertical:8}}
    />

    <Button size='large' style={{marginVertical:16, ...GlobalStyle.ButtonShadow, borderRadius:30}} onPress={()=>formikProps.handleSubmit()}>
    Reset Password
    </Button>
   
    </React.Fragment>

    )}
    </Formik>

    <Modal
    visible={visible}
    backdropStyle={styles.backdrop}>
    <Layout style={{flex:1, paddingTop:20, paddingHorizontal:20, borderRadius:12, marginBottom:300}}>
    <View style={{width:260}}>
    <Text  style={{textAlign:'center', marginVertical:12}}>A password reset has been sent to the requested email.</Text>
    </View>
    <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50, marginHorizontal:-20, borderBottomRightRadius:12, borderBottomLeftRadius:12, width:300, justifyContent:'center', marginTop:16}}>
    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
    <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{flex:1, height:50, borderRightWidth:0.5, borderRightColor:theme['color-basic-400'], justifyContent:'center' }}>
    <Text category='s1' status='info' style={{textAlign:"center",}}>Close</Text>
    </TouchableOpacity>
    </View>
    </View>
    </Layout>
    </Modal>


    </View>
    </SafeAreaView>
         
    )
     
  
}


const styles = StyleSheet.create({
  
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  
    image: {
      height:120,
      margin:-24,
      padding:18
    },
  
  });


export default ForgotPassword

