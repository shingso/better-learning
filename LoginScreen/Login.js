import React, { useState, useEffect, useContext } from 'react'
import { TextInput, View, SafeAreaView, Dimensions, Platform, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import { Button, Text ,Icon, Input, Layout } from '@ui-kitten/components';
import * as Yup from 'yup';
import { AuthContext } from '../AuthContext'

import SignInComponent from '../UtilComponents/SignInComponent'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email()
    .max(100, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .min(9, 'Minimum 9 Characters')
    .max(50, 'Too Long!')
    .required('Required'),

});





function Login(){
 
 const authContext = useContext(AuthContext)
 const navigation = useNavigation();
 const [secureTextEntry, setSecureTextEntry] = useState(false)


 const handleLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    
    });
  }



 


    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry)
    };


    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
      </TouchableWithoutFeedback>
    );

  

     return (

    
      <View style={{ flex: 1, justifyContent:'center', padding:16, paddingBottom:40}}>
      
      <View>
      <Text category='s1' style={{marginBottom:4, textAlign:'center'}}>Enter your email and well sen</Text>
      </View>

      <Formik
      initialValues={{ email:'', password:''}}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
       handleLogin(values.email, values.password)
       actions.setSubmitting(false);
      }}
    >

      
    {formikProps => (
    <React.Fragment>
   

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

    <Input
    value={formikProps.values.password}
    textStyle={{fontSize:14}}
    placeholder='Password'  
    status={formikProps.touched.password && formikProps.errors.password != null ? 'danger':'basic'}
    accessoryRight={renderIcon}
    label={formikProps.touched.password && formikProps.errors.password}
    size='large'
    secureTextEntry={secureTextEntry}
    onChangeText={formikProps.handleChange('password')}
    />

    <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()}>
    Login
    </Button>
    <Button appearance='ghost' onPress={()=>{navigation.navigate('ForgotPassword')}}>Forgot your password?</Button>
    </React.Fragment>


      )}
    </Formik>
    
    <View style={{marginVertical:20,  justifyContent:'center'}}>
    <Text category='s1' style={{alignSelf:'center', marginVertical:8}}> 
    Or with the following providers
    </Text>
    <SignInComponent/>
               

    </View>

    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Don't have an account?
    </Text>
    <Button appearance={'ghost'} onPress={() => navigation.navigate('SignUp')}>
    Go To Sign Up
    </Button>


  
             
    </View>
         
    )
     
  
}


export default Login

